<template>
  <div class="text-2xl font-bold text-green-400">
    <span>{{ displayText }}</span>
    <span class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  texts: {
    type: Array,
    required: true
  },
  speed: {
    type: Number,
    default: 100
  }
});

const displayText = ref('');
let currentIndex = 0;
let charIndex = 0;
let timer;

const typeText = () => {
  if (charIndex < props.texts[currentIndex].length) {
    displayText.value += props.texts[currentIndex][charIndex];
    charIndex++;
    timer = setTimeout(typeText, props.speed);
  } else {
    timer = setTimeout(eraseText, 1500);
  }
};

const eraseText = () => {
  if (charIndex > 0) {
    displayText.value = displayText.value.slice(0, -1);
    charIndex--;
    timer = setTimeout(eraseText, props.speed / 2);
  } else {
    currentIndex = (currentIndex + 1) % props.texts.length;
    timer = setTimeout(typeText, 500);
  }
};

onMounted(() => {
  typeText();
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
</style>