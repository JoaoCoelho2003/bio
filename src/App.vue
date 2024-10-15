<template>
  <div>
    <Header @scroll-to-section="handleScrollToSection" ref="headerRef" />
    <div id="fullpage">
      <div class="sections-wrapper">
        <section
          v-for="(section, index) in sections"
          :key="index"
          :id="'section-' + index"
          class="section"
          :style="{ paddingTop: headerHeight+40 + 'px' }"
        >
          <component :is="sectionViewMap[index]" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import HomeView from '@/views/HomeView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import fullpage from 'fullpage.js'

const sections = ref(['', 'skills', 'projects', 'contact'])
const route = useRoute()

const currentSectionIndex = ref(0)
const headerHeight = ref(0)
const headerRef = ref(null)
const fullpageInstance = ref(null)

onMounted(async () => {
  await nextTick()

  if (headerRef.value) {
    headerHeight.value = headerRef.value.clientHeight
  }

  const sectionIndex = sections.value.indexOf(route.name)
  if (sectionIndex !== -1) {
    currentSectionIndex.value = sectionIndex
  }

  fullpageInstance.value = new fullpage('#fullpage', {
    autoScrolling: true,
    scrollHorizontally: true,
    scrollingSpeed: 1000,
    keyboardScrolling: true,
    onLeave: (origin, destination, direction) => {
      currentSectionIndex.value = destination.index
      updateRoute(destination.index)
    },
  })
})

const sectionViewMap = {
  0: HomeView,
  1: SkillsView,
  2: ProjectsView,
  3: ContactView,
}

onUnmounted(() => {
  if (fullpageInstance.value) {
    fullpageInstance.value.destroy('all')
  }
})

const handleScrollToSection = (index) => {
  console.log(`Moving to section index: ${index + 1}`)
  if (fullpageInstance.value) {
    fullpageInstance.value.moveTo(index + 1)
  } else {
    console.error('Fullpage instance is not initialized.')
  }
}

const updateRoute = (index) => {
  const sectionName = sections.value[index]
  window.history.replaceState({}, '', `/${sectionName}`)
}
</script>

<style scoped>
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