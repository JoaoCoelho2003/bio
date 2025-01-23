<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="mb-8">
      <img src="/profileHD.png" class="rounded-full h-48 w-48 object-cover border-4 border-green-500 shadow-lg shadow-green-500/50">
    </div>
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4">João Coelho</h1>
      <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" :speed="60" />
    </div>
    <div class="max-w-2xl text-center mb-8">
      <p class="text-gray-400">
        I am a first-year Master's student in Software Engineering at the University of Minho. My journey has led me through various realms of computer science, from Algorithms and Data Structures to Artificial Intelligence. I'm also proud to contribute to CoderDojo, where I help nurture the next generation of programmers.
      </p>
    </div>
    <div class="flex space-x-6 mb-8">
      <a href="https://github.com/JoaoCoelho2003" target="_blank" class="text-green-500 hover:text-green-400 transition-colors duration-300">
        <i class="bi bi-github text-3xl"></i>
      </a>
      <a href="https://www.linkedin.com/in/joaocoelho03/" target="_blank" class="text-green-500 hover:text-green-400 transition-colors duration-300">
        <i class="bi bi-linkedin text-3xl"></i>
      </a>
    </div>
    <a
      href="/joaoCoelhoResume.pdf"
      download
      class="border-2 border-green-500 text-green-500 py-2 px-4 rounded-lg hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center"
    >
      <i class="bi bi-download mr-2"></i>
      <span>Download Resume</span>
    </a>
  </div>
</template>

<script setup>
import TypingAnimation from '@/components/TypingAnimation.vue'
</script>
