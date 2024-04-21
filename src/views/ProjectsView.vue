<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex items-center z-10">
      
    </div>
  </div>
</template>


<script>
import TypingAnimation from '@/components/typingAnimation.vue'
import HalfColorText from '@/components/halfColorText.vue' 

export default {
  components: {
    TypingAnimation,
    HalfColorText
  }
}
</script>