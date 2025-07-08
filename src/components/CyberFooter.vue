<template>
  <footer
    class="relative mt-20 border-t border-green-500/30 bg-black/80 backdrop-blur-sm"
  >
    <div
      class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
    ></div>

    <div class="container mx-auto px-4 py-8">
      <div
        class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
      >
        <div class="flex items-center space-x-2 text-sm text-gray-400">
          <span>Built with</span>
          <i class="bi bi-heart-fill text-green-500 animate-pulse"></i>
          <span>and lots of</span>
          <i class="bi bi-cup-fill text-green-400"></i>
          <span>by João Coelho</span>
        </div>

        <div class="flex items-center space-x-4 text-xs text-green-500/70">
          <span class="flex items-center space-x-1">
            <i class="bi bi-code-slash"></i>
            <span>Vue 3</span>
          </span>
          <span class="text-green-500/30">•</span>
          <span class="flex items-center space-x-1">
            <i class="bi bi-palette"></i>
            <span>Tailwind CSS</span>
          </span>
          <span class="text-green-500/30">•</span>
          <span class="flex items-center space-x-1">
            <i class="bi bi-lightning"></i>
            <span>Vite</span>
          </span>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-green-500/20 text-center">
        <p class="text-xs text-gray-500">
          © {{ currentYear }} João Coelho. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>
