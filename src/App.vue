<template>
  <div>
    <Header />
    <div class="sections-wrapper">
      <section
        v-for="(section, index) in sections"
        :key="index"
        :id="'section-' + index"
        class="section"
      >
        <component :is="sectionViewMap[index]" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/header.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'

const sections = ref(['', 'about', 'skills', 'projects', 'contact'])
const route = useRoute()

const currentSectionIndex = ref(0)
let isTransitioning = false

onMounted(() => {
  const sectionIndex = sections.value.indexOf(route.name)
  if (sectionIndex !== -1) {
    currentSectionIndex.value = sectionIndex
  }

  window.addEventListener('wheel', handleScroll)
  window.addEventListener('keydown', handleKeyDown)
})

const sectionViewMap = {
  0: HomeView,
  1: AboutView,
  2: SkillsView,
  3: ProjectsView,
  4: ContactView
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('wheel', handleScroll)
})

const handleScroll = (event) => {
  if (isTransitioning) return
  const delta = Math.sign(event.deltaY)
  if (
    (delta === 1 && currentSectionIndex.value < sections.value.length - 1) ||
    (delta === -1 && currentSectionIndex.value > 0)
  ) {
    event.preventDefault()
    currentSectionIndex.value += delta
    scrollToSection(currentSectionIndex.value)
  }
}

const handleKeyDown = (event) => {
  if (isTransitioning) return
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (currentSectionIndex.value > 0) {
      currentSectionIndex.value--
      scrollToSection(currentSectionIndex.value)
    }
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (currentSectionIndex.value < sections.value.length - 1) {
      currentSectionIndex.value++
      scrollToSection(currentSectionIndex.value)
    }
  }
}

const smoothScrollTo = (element, duration) => {
  isTransitioning = true
  const targetPosition = element.offsetTop - document.querySelector('header').offsetHeight
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const scrollProgress = Math.min(timeElapsed / duration, 1)
    const easing = (scrollProgress) =>
      scrollProgress < 0.5 ? 2 * scrollProgress ** 2 : 1 - 2 * (1 - scrollProgress) ** 2
    window.scrollTo(0, startPosition + distance * easing(scrollProgress))

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    } else {
      isTransitioning = false
    }
  }

  requestAnimationFrame(animation)
}

const scrollToSection = (index) => {
  const sectionElement = document.querySelector(`#section-${index}`)
  if (sectionElement) {
    const duration = 1000
    smoothScrollTo(sectionElement, duration)
    updateRoute(index)
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
  overflow-y: scroll;
  transition: transform 1s;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure it's above other content */
}

::-webkit-scrollbar {
  display: none;
}
</style>
