<template>
  <Header @scroll-to-section="handleScrollToSection" />
  <div>
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
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import HomeView from '@/views/HomeView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'

const sections = ref(['', 'skills', 'projects', 'contact'])
const route = useRoute()

const currentSectionIndex = ref(0)
let isTransitioning = false

onMounted(() => {
  const sectionIndex = sections.value.indexOf(route.name)
  if (sectionIndex !== -1) {
    currentSectionIndex.value = sectionIndex
  }

  window.addEventListener('wheel', handleScrollThrottled)
  window.addEventListener('keydown', handleKeyDown)
})

const sectionViewMap = {
  0: HomeView,
  1: SkillsView,
  2: ProjectsView,
  3: ContactView
}

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('wheel', handleScrollThrottled)
})

const handleScrollThrottled = (event) => {
  if (!isTransitioning) {
    handleScroll(event)
  }
}

const handleScroll = (event) => {
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
  const startTime = performance.now()

  const animation = () => {
    const currentTime = performance.now()
    const timeElapsed = currentTime - startTime
    const scrollProgress = Math.min(timeElapsed / duration, 1)
    const easing = (scrollProgress) =>
      scrollProgress < 0.5 ? 2 * scrollProgress ** 2 : 1 - 2 * (1 - scrollProgress) ** 2
    const newPosition = startPosition + distance * easing(scrollProgress)
    window.scrollTo(0, newPosition)

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

const handleScrollToSection = (index) => {
  if (!isTransitioning) {
    currentSectionIndex.value = index
    scrollToSection(index)
  }
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
  z-index: 1000;
}

::-webkit-scrollbar {
  display: none;
}
</style>
