<template>
  <header class="flex justify-between items-center p-4 shadow-md z-50">
    <div>
      <span class="text-[#d62f6a] font-bold text-3xl">João Coelho</span>
    </div>
    <div class="flex space-x-4">
      <ButtonAnimated buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="About" :sectionIndex="1" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Skills" :sectionIndex="2" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Projects" :sectionIndex="3" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Contact" :sectionIndex="4" @scroll-to-section="emitScrollToSection" />
    </div>
  </header>
</template>
  
<script setup>
import ButtonAnimated from '@/components/ButtonAnimated.vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['scroll-to-section'])

const emitScrollToSection = (index) => {
  emit('scroll-to-section', index)
}
</script>
