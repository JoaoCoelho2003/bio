<template>
  <header class="flex justify-between items-center p-4 bg-black shadow-md z-50">
    <div>
      <span class="text-cyan-400 font-bold text-3xl">João Coelho</span>
    </div>
    <div class="flex space-x-4">
      <ButtonAnimated buttonText="Home" :sectionIndex="0" />
      <ButtonAnimated buttonText="About" :sectionIndex="1" />
      <ButtonAnimated buttonText="Skills" :sectionIndex="2" />
      <ButtonAnimated buttonText="Projects" :sectionIndex="3" />
      <ButtonAnimated buttonText="Contact" :sectionIndex="4" />
    </div>
  </header>
</template>
  
<script setup>
import ButtonAnimated from '@/components/buttonAnimated.vue';
</script>
