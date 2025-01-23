<template>
    <div class="min-h-screen flex flex-wrap justify-center items-center p-4">
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div
          v-for="(panel, index) in panels"
          :key="panel.name"
          class="bg-gray-900 border-2 border-green-500 rounded-lg overflow-hidden shadow-lg hover:shadow-green-500/50 transition-all duration-300 cursor-pointer"
          @click="navigateTo(panel.route)"
        >
          <div class="p-6 h-full flex flex-col justify-between">
            <h2 class="text-2xl font-bold mb-4 text-green-400">{{ panel.name }}</h2>
            <p class="text-gray-400 mb-4">{{ panel.description }}</p>
            <div class="text-right">
              <span class="text-green-500">> Enter</span>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import gsap from 'gsap'
  
  const router = useRouter()
  
  const panels = ref([
    { name: 'Home', description: 'Welcome to my digital realm', route: '/home' },
    { name: 'Skills', description: 'Explore my technical arsenal', route: '/skills' },
    { name: 'Projects', description: 'Witness my digital creations', route: '/projects' },
    { name: 'Contact', description: 'Initiate a connection', route: '/contact' },
  ])
  
  const navigateTo = (route) => {
    router.push(route)
  }
  
  const beforeEnter = (el) => {
    el.style.opacity = 0
    el.style.transform = 'scale(0.8)'
  }
  
  const enter = (el, done) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      delay: el.dataset.index * 0.2,
      onComplete: done
    })
  }
  
  const leave = (el, done) => {
    gsap.to(el, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      onComplete: done
    })
  }
  </script>
  