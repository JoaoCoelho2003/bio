<template>
  <AppLayout>
    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col items-center justify-start z-10">
      <div class="mt-8 md:mt-[5vw] xl:mt-[2vw] mb-8 md:mb-[2vw] relative z-20">
        <img 
          src="/profileHD.png" 
          class="rounded-full w-[30vh] md:w-[35vh] xl:w-[40vh] object-cover relative z-20"
          alt="Profile Picture"
        >
      </div>

      <div class="text-white text-lg md:text-xl mb-6">
        <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" :speed="60" />
      </div>

      <div class="text-white w-full max-w-screen-lg px-4">
        <div class="text-xs md:text-sm lg:text-lg font-light leading-relaxed text-center md:text-left">
          <p>
            I am a Master's student in Software Engineering at the University of Minho, exploring areas such as Distributed Systems, Cybersecurity and AI. I also contribute to CoderDojo, teaching programming to kids aged 7-17.
          </p>
        </div>

        <div class="flex justify-center space-x-8 mt-8 mb-12">
          <a 
            href="https://github.com/JoaoCoelho2003" 
            target="_blank" 
            class="text-white text-3xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300"
            aria-label="GitHub"
          >
            <i class="bi bi-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/joaocoelho03/" 
            target="_blank" 
            class="text-white text-3xl lg:text-4xl hover:text-[#d62f6a] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <i class="bi bi-linkedin"></i>
          </a>
        </div>

        <div class="text-center">
          <a 
            href="/joaoCoelhoResume.pdf" 
            download 
            class="inline-flex items-center border transition duration-300 ease-in-out py-2 lg:py-4 px-4 lg:px-8 rounded-lg text-base lg:text-xl"
            :style="{ 
              borderColor: isHovered ? '#d62f6a' : '#d62f6a', 
              backgroundColor: isHovered ? '#d62f6a' : '', 
              color: isHovered ? 'black' : '#d62f6a' 
            }"
            @mouseover="isHovered = true" 
            @mouseleave="isHovered = false"
          >
            <i 
              class="bi bi-download mr-2 text-lg lg:text-xl font-bold"
              :style="{ color: isHovered ? 'black' : '' }"
            ></i>
            <span>Resume</span>
          </a>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import TypingAnimation from '@/components/typingAnimation.vue';
import AppLayout from '@/components/AppLayout.vue';

const isHovered = ref(false);
</script>
