<template>
  <div class="relative">
    <div class="flex items-center mb-8">
      <h2
        class="text-2xl sm:text-3xl font-bold text-green-500 flex items-center"
      >
        <i :class="icon" class="mr-3"></i>
        {{ title }}
      </h2>
      <div
        class="flex-1 ml-6 h-px bg-gradient-to-r from-green-500/30 to-transparent"
      ></div>
    </div>

    <div class="space-y-0">
      <TimelineItem v-for="(item, index) in items" :key="index" :item="item" />
    </div>
  </div>
</template>

<script setup>
import TimelineItem from "./TimelineItem.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});
</script>
