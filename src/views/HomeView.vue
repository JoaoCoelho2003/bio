<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path d="M 0,100 C 150,200 350,0 500,100 L 500,0 L 0,0 Z" fill="#051f46"></path>
    </svg>

    <div id="app" class="relative bg-[#021d44] min-h-screen flex flex-col items-center justify-start pt-20 z-10">
      <div class="mt-20 xl:mt-40 mb-10">
        <img src="/profileHD.png" class="rounded-full h-auto w-3/4 xl:w-1/2 object-cover mx-auto">
      </div>

      <div class="text-white mb-4">
        <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" :speed="60" />
      </div>

      <div class="text-white w-full lg:w-2/3">
        <div class="grid grid-cols-1 p-4 gap-4">
          <div class="text-sm lg:text-lg font-light">
            <p>I am a third-year student of Software Engineering at the University of Minho. Throughout my academic journey, I have delved into various areas including Algorithms and Data Structures, Computer Networking, Distributed Systems, Formal Methods, Cybersecurity, Artificial Intelligence, etc. Additionally, I've been actively involved in initiatives like CoderDojo, where I've contributed my skills to teaching programming to kids aged 7-17.</p>
          </div>

          <div class="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/JoaoCoelho2003" target="_blank" class="text-white text-2xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300">
              <i class="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/joaocoelho03/" target="_blank" class="text-white text-2xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>

          <div class="text-center">
            <a href="/joaoCoelhoResume.pdf" download 
               class="text-base lg:text-xl border transition duration-300 ease-in-out py-2 lg:py-4 px-4 lg:px-8 rounded-xl inline-flex items-center"
               :style="{ borderColor: isHovered ? '#d62f6a' : '#d62f6a', backgroundColor: isHovered ? '#d62f6a' : '', color: isHovered ? 'black' : '#d62f6a' }"
               @mouseover="isHovered = true" @mouseleave="isHovered = false">
              <i class="bi bi-download text-base lg:text-xl font-bold mr-2"
                 :style="{ color: isHovered ? 'black' : '' }"></i>
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TypingAnimation from '@/components/typingAnimation.vue'

const isHovered = ref(false)
</script>
