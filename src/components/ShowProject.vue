<template>
    <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur" @click="handleClickOutside">
      <div class="bg-[#062656] border border-[#021d44] p-8 rounded-lg shadow-xl overflow-hidden space-y-4 w-[90vw] h-[80vh] relative" @click.stop>
        <button @click="$emit('close')" class="absolute top-0 right-2 text-gray-300 text-3xl">✕</button>
        <div class="grid grid-cols-2 gap-4">
          <img :src="imageSrc" alt="Project Image" class="w-full h-[70vh] object-cover rounded-t-lg"/>
  
        <div class="text-white space-y-12">
          <h3 class="text-4xl font-bold">{{ title }}</h3>
          <p class="text-gray-300 mt-2 text-lg">{{ description }}</p>

          <div class="flex flex-wrap gap-8">
            <span v-for="(tech, index) in technologies" :key="index" class="text-white text-5xl flex items-center space-x-1">
                <i :class="tech"></i>
            </span>
            </div>
    
            <div class="mt-4">
            <a :href="giturl" target="_blank" class="text-3xl font-light text-gray-200 dark:text-gray-300 hover:underline hover:text-[#d62f6a] transition-colors duration-300">
                <i class="bi bi-github"></i> View on GitHub
            </a>
            </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    imageSrc: {
      type: String,
      required: true
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
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      emit('close');
    }
  };
  
  onMounted(() => {
    document.body.style.overflow = 'hidden';
    });

    onUnmounted(() => {
    document.body.style.overflow = '';
    });
  </script>