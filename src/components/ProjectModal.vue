<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div class="fixed inset-0 bg-black opacity-75" @click="$emit('close')"></div>
      <div class="relative w-full max-w-4xl rounded-lg shadow-lg border border-green-500 overflow-hidden">
        <div class="cyber-bg p-4 md:p-6">
          <button @click="$emit('close')" class="absolute top-2 right-2 md:top-4 md:right-4 text-green-500 hover:text-green-400">
            <i class="bi bi-x-lg text-xl md:text-2xl"></i>
          </button>
          <h2 class="text-2xl md:text-3xl font-bold mb-4 text-green-400 glitch-text" :data-text="project.title">
            {{ project.title }}
          </h2>
          <div class="mb-4 md:mb-6 relative h-48 md:h-96 overflow-hidden rounded-lg">
            <div class="absolute inset-0 flex">
              <transition-group name="carousel">
                <img v-for="(image, index) in project.images" :key="image" 
                     :src="image" :alt="project.title" 
                     v-show="currentImageIndex === index"
                     class="w-full h-full object-cover absolute inset-0">
              </transition-group>
            </div>
            <div class="absolute inset-x-0 bottom-0 flex justify-center space-x-2 p-2">
              <button v-for="(_, index) in project.images" :key="index" 
                      @click="currentImageIndex = index"
                      :class="['w-2 h-2 md:w-3 md:h-3 rounded-full', currentImageIndex === index ? 'bg-green-500' : 'bg-gray-500']">
              </button>
            </div>
            <button @click="prevImage" class="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 md:p-2 hover:bg-opacity-75">
              <i class="bi bi-chevron-left text-sm md:text-base"></i>
            </button>
            <button @click="nextImage" class="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 md:p-2 hover:bg-opacity-75">
              <i class="bi bi-chevron-right text-sm md:text-base"></i>
            </button>
          </div>
          <p class="text-sm md:text-base text-gray-300 mb-4">{{ project.description }}</p>
          <div class="mb-4">
            <h3 class="text-lg md:text-xl font-semibold mb-2 text-green-400">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" 
                    class="bg-gray-800 text-green-400 text-xs px-2 py-1 rounded">
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="text-lg md:text-xl font-semibold mb-2 text-green-400">Key Features</h3>
            <ul class="list-disc list-inside text-sm md:text-base text-gray-300">
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
          <div class="flex flex-col md:flex-row justify-between mt-4 md:mt-6 space-y-2 md:space-y-0 md:space-x-2">
            <a v-if="project.weburl" :href="project.weburl" target="_blank" 
               class="inline-flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-black transition-all duration-300 text-sm md:text-base">
              <i class="bi bi-globe2 mr-2"></i> Visit Site
            </a>
            <a v-if="project.giturl" :href="project.giturl" target="_blank" 
               class="inline-flex items-center justify-center px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-black transition-all duration-300 text-sm md:text-base">
              <i class="bi bi-github mr-2"></i> View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    show: Boolean,
    project: Object
  });
  
  const currentImageIndex = ref(0);
  
  const nextImage = () => {
    currentImageIndex.value = (currentImageIndex.value + 1) % props.project.images.length;
  };
  
  const prevImage = () => {
    currentImageIndex.value = (currentImageIndex.value - 1 + props.project.images.length) % props.project.images.length;
  };
  
  watch(() => props.show, (newValue) => {
    if (newValue) {
      currentImageIndex.value = 0;
    }
  });
  </script>
  
  <style scoped>
  .cyber-bg {
    background-color: rgba(0, 0, 0, 0.8);
    background-image: 
      radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 30%);
    position: relative;
    overflow: hidden;
  }
  
  .cyber-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(45deg, transparent 48%, rgba(0, 255, 0, 0.1) 50%, transparent 52%),
      linear-gradient(-45deg, transparent 48%, rgba(0, 255, 0, 0.1) 50%, transparent 52%);
    background-size: 4px 4px;
    pointer-events: none;
  }
  
  .glitch-text {
    position: relative;
    display: inline-block;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch-text::before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }
  
  .glitch-text::after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
  }
  
  @keyframes glitch-anim {
    0% {
      clip: rect(31px, 9999px, 94px, 0);
    }
    4.166666667% {
      clip: rect(91px, 9999px, 43px, 0);
    }
    8.333333333% {
      clip: rect(15px, 9999px, 13px, 0);
    }
    12.5% {
      clip: rect(75px, 9999px, 57px, 0);
    }
    16.66666667% {
      clip: rect(8px, 9999px, 4px, 0);
    }
    20.83333333% {
      clip: rect(69px, 9999px, 70px, 0);
    }
    25% {
      clip: rect(75px, 9999px, 53px, 0);
    }
    29.16666667% {
      clip: rect(57px, 9999px, 70px, 0);
    }
    33.33333333% {
      clip: rect(61px, 9999px, 70px, 0);
    }
    37.5% {
      clip: rect(75px, 9999px, 85px, 0);
    }
    41.66666667% {
      clip: rect(15px, 9999px, 81px, 0);
    }
    45.83333333% {
      clip: rect(90px, 9999px, 33px, 0);
    }
    50% {
      clip: rect(80px, 9999px, 99px, 0);
    }
    54.16666667% {
      clip: rect(62px, 9999px, 82px, 0);
    }
    58.33333333% {
      clip: rect(13px, 9999px, 32px, 0);
    }
    62.5% {
      clip: rect(5px, 9999px, 47px, 0);
    }
    66.66666667% {
      clip: rect(40px, 9999px, 31px, 0);
    }
    70.83333333% {
      clip: rect(19px, 9999px, 16px, 0);
    }
    75% {
      clip: rect(75px, 9999px, 9px, 0);
    }
    79.16666667% {
      clip: rect(76px, 9999px, 82px, 0);
    }
    83.33333333% {
      clip: rect(93px, 9999px, 54px, 0);
    }
    87.5% {
      clip: rect(84px, 9999px, 85px, 0);
    }
    91.66666667% {
      clip: rect(6px, 9999px, 79px, 0);
    }
    95.83333333% {
      clip: rect(66px, 9999px, 65px, 0);
    }
    100% {
      clip: rect(40px, 9999px, 84px, 0);
    }
  }
  
  @keyframes glitch-anim2 {
    0% {
      clip: rect(65px, 9999px, 91px, 0);
    }
    4.166666667% {
      clip: rect(45px, 9999px, 50px, 0);
    }
    8.333333333% {
      clip: rect(5px, 9999px, 84px, 0);
    }
    12.5% {
      clip: rect(25px, 9999px, 23px, 0);
    }
    16.66666667% {
      clip: rect(56px, 9999px, 98px, 0);
    }
    20.83333333% {
      clip: rect(86px, 9999px, 61px, 0);
    }
    25% {
      clip: rect(57px, 9999px, 80px, 0);
    }
    29.16666667% {
      clip: rect(35px, 9999px, 59px, 0);
    }
    33.33333333% {
      clip: rect(86px, 9999px, 31px, 0);
    }
    37.5% {
      clip: rect(57px, 9999px, 78px, 0);
    }
    41.66666667% {
      clip: rect(35px, 9999px, 55px, 0);
    }
    45.83333333% {
      clip: rect(44px, 9999px, 51px, 0);
    }
    50% {
      clip: rect(51px, 9999px, 46px, 0);
    }
    54.16666667% {
      clip: rect(52px, 9999px, 23px, 0);
    }
    58.33333333% {
      clip: rect(86px, 9999px, 7px, 0);
    }
    62.5% {
      clip: rect(38px, 9999px, 33px, 0);
    }
    66.66666667% {
      clip: rect(71px, 9999px, 71px, 0);
    }
    70.83333333% {
      clip: rect(37px, 9999px, 51px, 0);
    }
    75% {
      clip: rect(25px, 9999px, 16px, 0);
    }
    79.16666667% {
      clip: rect(65px, 9999px, 97px, 0);
    }
    83.33333333% {
      clip: rect(90px, 9999px, 79px, 0);
    }
    87.5% {
      clip: rect(1px, 9999px, 46px, 0);
    }
    91.66666667% {
      clip: rect(89px, 9999px, 3px, 0);
    }
    95.83333333% {
      clip: rect(56px, 9999px, 84px, 0);
    }
    100% {
      clip: rect(44px, 9999px, 12px, 0);
    }
  }
  
  .carousel-enter-active,
  .carousel-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .carousel-enter-from,
  .carousel-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 640px) {
    .glitch-text::before,
    .glitch-text::after {
      display: none;
    }
  }
  </style>