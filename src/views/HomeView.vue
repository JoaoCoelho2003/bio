<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex items-center z-10">
      <div class="text-white p-20">
        <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" size="4em" :speed="60" />
      </div>

      <div class= "absolute z-10 top-1/4 left-1/2">
        <HalfColorText fontSize="12em" color1="white" color2="#d62f6a" text1="Hel" text2="lo,"/>
      </div>

      <div class="absolute z-10 top-1/2 left-1/2">
        <HalfColorText fontSize="7em" color1="white" color2="#d62f6a" text1="I am " text2="João Coelho"/>
      </div>
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
