<template>
  <div class="app-wrapper">
    <Header @scroll-to-section="handleScrollToSection" ref="headerRef" />
    <div 
      id="scroll-container" 
      class="scroll-container"
      @wheel="handleWheel"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      ref="scrollContainer"
    >
      <div 
        v-for="(section, index) in sections" 
        :key="index"
        :id="'section-' + index"
        class="section"
        :style="{
          transform: `translateY(${(index - currentSectionIndex) * 100}%)`,
          transition: isAnimating ? 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'
        }"
      >
        <component :is="sectionViewMap[index]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import HomeView from '@/views/HomeView.vue';
import SkillsView from '@/views/SkillsView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ContactView from '@/views/ContactView.vue';

const sections = ref(['', 'skills', 'projects', 'contact']);
const route = useRoute();
const currentSectionIndex = ref(0);
const isAnimating = ref(false);
const headerRef = ref(null);
const touchStartY = ref(0);
const scrollContainer = ref(null);

const sectionViewMap = {
  0: HomeView,
  1: SkillsView,
  2: ProjectsView,
  3: ContactView,
};

const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};

const handleScrollToSection = async (index) => {
  if (isAnimating.value || currentSectionIndex.value === index) return;
  
  isAnimating.value = true;
  currentSectionIndex.value = index;
  updateRoute(index);
  
  // Wait for animation to complete
  await new Promise(resolve => setTimeout(resolve, 600));
  isAnimating.value = false;
};

const handleWheel = debounce((e) => {
  if (isAnimating.value) return;
  
  if (e.deltaY > 0 && currentSectionIndex.value < sections.value.length - 1) {
    handleScrollToSection(currentSectionIndex.value + 1);
  } else if (e.deltaY < 0 && currentSectionIndex.value > 0) {
    handleScrollToSection(currentSectionIndex.value - 1);
  }
}, 50);

const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY;
};

const handleTouchMove = debounce((e) => {
  if (isAnimating.value) return;
  
  const touchEndY = e.touches[0].clientY;
  const deltaY = touchStartY.value - touchEndY;
  
  if (Math.abs(deltaY) > 50) { // Threshold for swipe
    if (deltaY > 0 && currentSectionIndex.value < sections.value.length - 1) {
      handleScrollToSection(currentSectionIndex.value + 1);
    } else if (deltaY < 0 && currentSectionIndex.value > 0) {
      handleScrollToSection(currentSectionIndex.value - 1);
    }
    touchStartY.value = touchEndY;
  }
}, 50);

const updateRoute = (index) => {
  const sectionName = sections.value[index];
  window.history.replaceState({}, '', `/${sectionName}`);
};

const handleKeyDown = debounce((event) => {
  if (event.key === 'ArrowDown') {
    if (currentSectionIndex.value < sections.value.length - 1) {
      handleScrollToSection(currentSectionIndex.value + 1);
    }
  } else if (event.key === 'ArrowUp') {
    if (currentSectionIndex.value > 0) {
      handleScrollToSection(currentSectionIndex.value - 1);
    }
  }
}, 50);

onMounted(async () => {
  await nextTick();
  
  if (headerRef.value) {
    const headerHeight = headerRef.value.$el.clientHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }

  const sectionIndex = sections.value.indexOf(route.name);
  if (sectionIndex !== -1) {
    currentSectionIndex.value = sectionIndex;
  }

  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.app-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #021d44;
}

.scroll-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: var(--header-height, 0px);
  will-change: transform;
}

::-webkit-scrollbar {
  display: none;
}
</style>