<template>
  <div class="relative pl-10 pb-8 last:pb-0 group">
    <div
      class="absolute left-2.5 top-2 bottom-0 w-0.5 bg-green-500/30 group-last:hidden"
    ></div>

    <div
      class="absolute left-1 top-2 w-3.5 h-3.5 bg-black border-2 border-green-500 rounded-full transition-all duration-300 z-10 group-hover:bg-green-500 group-hover:scale-110"
    >
      <div
        class="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"
      ></div>
    </div>

    <div class="transition-all duration-300 group-hover:translate-x-2.5">
      <h3 class="text-lg sm:text-xl font-semibold text-green-400 mb-2">
        {{ item.title }}
      </h3>

      <p class="text-sm sm:text-base text-gray-400">
        <a
          v-if="item.link"
          :href="item.link"
          target="_blank"
          class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
        >
          {{ item.organization }}
          <i class="bi bi-box-arrow-up-right ml-2"></i>
        </a>
        <span v-else>{{ item.organization }}</span>
      </p>

      <p class="text-xs sm:text-sm text-green-500/70 mt-1">
        {{ item.period }}
        <span v-if="item.location"> | {{ item.location }}</span>
      </p>

      <div
        v-if="item.skills"
        class="flex items-center mt-2 text-xs sm:text-sm text-green-400"
      >
        <i class="bi bi-heart mr-2"></i>
        {{ item.skills }}
      </div>

      <div
        v-if="item.subItems && item.subItems.length > 0"
        class="mt-4 space-y-2"
      >
        <div
          v-for="(subItem, index) in item.subItems"
          :key="index"
          class="relative flex items-start space-x-3"
        >
          <div class="flex-shrink-0 mt-1.5">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>

          <div class="flex-1 min-w-0">
            <h4 class="text-base font-medium text-green-300 mb-1">
              {{ subItem.title }}
            </h4>
            <p
              v-if="subItem.description"
              class="text-sm text-gray-400 leading-relaxed"
            >
              {{ subItem.description }}
            </p>
            <p v-if="subItem.period" class="text-xs text-green-500/60 mt-1">
              {{ subItem.period }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
