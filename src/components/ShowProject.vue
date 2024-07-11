<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur" @click="handleClickOutside">
    <div class="bg-[#062656] border border-[#021d44] p-8 sm:rounded-lg shadow-xl overflow-hidden w-full h-full sm:w-[90vw] sm:h-[85vh] relative" @click.stop>
      <button @click="$emit('close')" class="absolute top-0 right-2 text-gray-300 text-xl sm:text-3xl">✕</button>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="w-full">
          <Carousel>
            <Slide v-for="(image, index) in images" :key="index">
              <div class="relative w-full object-fill object-center rounded-t-xl lg:p-0">
              <div>
                <img
                  :src="image"
                  class="w-full h-[40vh] sm:h-[70vh] object-cover rounded-t-lg"
                  alt="Project Image" 
                />
              </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <div class="text-white space-y-4 sm:space-y-12">
          <h3 class="text-sm sm:text-4xl font-bold">{{ title }}</h3>
          <p class="text-gray-300 mt-2 text-xs sm:text-lg">{{ description }}</p>

          <div class="flex flex-wrap gap-4 sm:gap-8">
            <span v-for="(tech, index) in technologies" :key="index" class="text-white text-xl sm:text-5xl flex items-center space-x-1">
                <i :class="tech"></i>
            </span>
            </div>
    
            <div class="mt-4">
            <a :href="giturl" target="_blank" class="text-lg sm:text-3xl font-light text-gray-200 dark:text-gray-300 hover:underline hover:text-[#d62f6a] transition-colors duration-300">
                <i class="bi bi-github"></i> View on GitHub
            </a>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  images: {
    type: Array,
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

<style>
.carousel__slide {
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 100%;
padding: 0;
margin: 0;
}

.carousel__viewport {
width: 100%;
height: 100%;
overflow: hidden;
}

.carousel__viewport {
background-color: #051f46;
border-top-left-radius: 25px;
border-top-right-radius: 25px;
}

.carousel__pagination {
display: flex;
justify-content: center;
align-items: center;
list-style: none;
line-height: 0;
height: 44px;
background-color: #051f46;
border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px;
margin: 0px;
padding: 0;
}

.carousel__pagination-item {
display: flex;
align-items: center;
justify-content: center;
padding: 0;
background: transparent;
}

.carousel__pagination-button::after {
width: 16px;
height: 16px;
border-radius: 8px;
background-color: #3c4a77;
}

.carousel__pagination-button--active::after {
background-color: #d62f6a;
}

@media (hover: hover) {
  .carousel__pagination-button:hover::after {
    background-color: #3c4a77;
    outline-style: solid;
    outline-width: 2px;
    outline-color: #d62f6a;
  }
}

@media (max-width: 768px) {
.carousel__viewport {
  height: 35vh;
}

.carousel__pagination {
  height: 32px;
}

.carousel__pagination-button::after {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}
}
</style>