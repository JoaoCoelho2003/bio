<template>
  <div>
    <Header @scroll-to-section="handleScrollToSection" ref="headerRef" />
    <div id="scroll-container" class="scroll-container" @scroll="onScroll">
      <section
        v-for="(section, index) in sections"
        :key="index"
        :id="'section-' + index"
        class="section"
        :style="{ paddingTop: '7vh' }"
      >
        <component :is="sectionViewMap[index]" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import HomeView from '@/views/HomeView.vue';
import SkillsView from '@/views/SkillsView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ContactView from '@/views/ContactView.vue';

const sections = ref(['', 'skills', 'projects', 'contact']);
const route = useRoute();

const currentSectionIndex = ref(0);
const headerHeight = ref(0);
const headerRef = ref(null);

onMounted(async () => {
  await nextTick();

  if (headerRef.value) {
    headerHeight.value = headerRef.value.clientHeight;
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

const sectionViewMap = {
  0: HomeView,
  1: SkillsView,
  2: ProjectsView,
  3: ContactView,
};

const handleScrollToSection = (index) => {
  const scrollContainer = document.getElementById('scroll-container');
  if (scrollContainer) {
    const targetSection = scrollContainer.querySelector(`#section-${index}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      updateRoute(index);
    }
  } else {
    console.error('Scroll container is not initialized.');
  }
};

const onScroll = () => {
  const scrollContainer = document.getElementById('scroll-container');
  if (scrollContainer) {
    const sectionsElements = scrollContainer.querySelectorAll('.section');
    sectionsElements.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        if (currentSectionIndex.value !== index) {
          currentSectionIndex.value = index;
          updateRoute(index);
        }
      }
    });
  }
};

const updateRoute = (index) => {
  const sectionName = sections.value[index];
  window.history.replaceState({}, '', `/${sectionName}`);
};

const handleKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    if (currentSectionIndex.value < sections.value.length - 1) {
      handleScrollToSection(currentSectionIndex.value + 1);
    }
  } else if (event.key === 'ArrowUp') {
    if (currentSectionIndex.value > 0) {
      handleScrollToSection(currentSectionIndex.value - 1);
    }
  }
};
</script>

<style scoped>
.scroll-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.section {
  height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 20;
}

::-webkit-scrollbar {
  display: none;
}
</style>