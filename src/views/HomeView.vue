<template>
  <div id="app" class="bg-black min-h-screen flex items-center justify-center">
    <div class="text-white text-center">
      <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" size="3em" :speed="60" />
    </div>
  </div>
</template>

<script>
import TypingAnimation from '@/components/typingAnimation.vue'

export default {
  components: {
    TypingAnimation
  }
}
</script>
