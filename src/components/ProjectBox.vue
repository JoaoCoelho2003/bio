<template>
  <div class="bg-[#062656] border border-[#021d44] rounded-lg shadow-xl flex flex-col items-start overflow-hidden space-y-2 sm:space-y-4 z-10 relative" @click="showPopup = !showPopup">
    <img :src="images[0]" alt="Project Image" class="w-full h-1/2 object-fit object-center rounded-t-lg"/>
    <div class="text-white p-1 sm:space-y-4">
      <h3 class="text-xs sm:text-xl font-bold">{{ title }}</h3>
      <p class="text-gray-300 text-[0.675rem] sm:text-base line-clamp-2 sm:line-clamp-3">{{ description }}</p>
    </div>

    <div class="flex flex-wrap gap-2 sm:gap-4 ml-1 sm:ml-2">
      <span v-for="(tech, index) in technologies" :key="index" class="text-white text-sm sm:text-3xl flex items-center space-x-1">
        <i :class="tech"></i>
      </span>
    </div>
    <div class="p-4 sm:p-4">
      <a v-if="weburl" :href="weburl" target="_blank" class="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-md md:text-3xl md:font-light text-gray-200 dark:text-gray-300 hover:underline hover:text-[#d62f6a] transition-colors duration-300">
        <i class="bi bi-globe"></i>
      </a>
      <a v-else-if="giturl" :href="giturl" target="_blank" class="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 text-md md:text-3xl md:font-light text-gray-200 dark:text-gray-300 hover:underline hover:text-[#d62f6a] transition-colors duration-300">
        <i class="bi bi-github"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  images: {
    type: Array,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: {
    type: Array,
    required: true
  },
  giturl: {
    type: String,
    required: false
  },
  weburl: {
    type: String,
    required: false
  }
});

const showPopup = ref(false);
</script>
