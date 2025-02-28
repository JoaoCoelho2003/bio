<template>
  <div
    class="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-green-500 hover:shadow-green-500/50 transition-all duration-300"
  >
    <div class="relative h-48">
      <img
        :src="images[currentImageIndex]"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 flex items-center justify-between p-2">
        <button
          @click="prevImage"
          class="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button
          @click="nextImage"
          class="text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 text-green-400">{{ title }}</h3>
      <p class="text-gray-400 mb-4">{{ description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in technologies"
          :key="tech"
          class="bg-gray-800 text-green-400 text-xs px-2 py-1 rounded"
          >{{ tech }}</span
        >
      </div>
      <div class="flex justify-between">
        <a
          v-if="weburl"
          :href="weburl"
          target="_blank"
          class="text-green-500 hover:text-green-400 transition-colors duration-300"
        >
          <i class="bi bi-globe2 mr-1"></i> Visit Site
        </a>
        <a
          v-if="giturl"
          :href="giturl"
          target="_blank"
          class="text-green-500 hover:text-green-400 transition-colors duration-300"
        >
          <i class="bi bi-github mr-1"></i> View Code
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  description: String,
  technologies: Array,
  images: Array,
  weburl: String,
  giturl: String,
});

const currentImageIndex = ref(0);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const prevImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + props.images.length) % props.images.length;
};
</script>
