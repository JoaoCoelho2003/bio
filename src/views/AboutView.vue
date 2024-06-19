<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col lg:flex-row items-center z-10">
      <div class="absolute top-0 left-0 p-10 lg:p-40 lg:w-2/3">
        <div class="text-white font-bold text-4xl lg:text-8xl">
          <span class="underline-custom">About Me</span>
        </div>
        <div class="text-white text-base lg:text-lg mt-5 lg:mt-10 font-light">
          <span>I am a third-year student of Software Engineering at the University of Minho.</span><br><br>
          <span>Throughout my academic journey, I have delved into various areas including Algorithms and Data Structures,</span><br>
          <span>Computer Networking, Distributed Systems, Formal Methods, Cybersecurity, Artificial Intelligence, etc.</span><br><br>
          <span>Additionally, I've been actively involved in initiatives like CoderDojo, where I've contributed my skills to teaching</span><br>
          <span>programming to kids aged 7-17.</span>
        </div>

        <div class="mt-5 lg:mt-10 flex">
          <a href="https://github.com/JoaoCoelho2003" target="_blank" class="text-white text-2xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300">
            <i class="bi bi-github"></i>
          </a>

          <a href="https://www.linkedin.com/in/joaocoelho03/" target="_blank" class="text-white text-2xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300 ml-5">
            <i class="bi bi-linkedin"></i>
          </a>
        </div>

        <div class="mt-5 lg:mt-10" @mouseover="isHovered = true" @mouseleave="isHovered = false">
          <a href="/public/joaoCoelhoResume.pdf" download class="text-base lg:text-xl border transition duration-300 ease-in-out py-2 lg:py-4 px-4 lg:px-8 rounded-2xl inline-flex items-center"
            :style="{ borderColor: isHovered ? '#d62f6a' : '#d62f6a', backgroundColor: isHovered ? '#d62f6a' : '', color: isHovered ? 'black' : '#d62f6a' }">
            <i class="bi bi-download text-base lg:text-xl font-bold mr-2"
              :style="{ color: isHovered ? 'black' : '' }"></i>
            <span>{{ 'Resume' }}</span>
          </a>
        </div>
      </div>
      
      <div class="absolute w-2/3 h-1/3 lg:w-1/3 lg:h-2/3 right-5 lg:right-20 flex items-center justify-center rounded-full mt-20 lg:mt-0">
        <img src="/public/profileHD.png" class="rounded-full w-full h-full object-cover">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
.underline-custom {
  border-bottom: 3px solid #d62f6a;
}
</style>
