<template>
  <header class="flex justify-between items-center p-4 shadow-md fixed top-0 w-full bg-[#051f46] z-10">
    <div>
      <span class="text-[#d62f6a] font-bold text-2xl lg:text-3xl">&lt;João Coelho /&gt;</span>
    </div>
    <div class="lg:hidden relative">
      <button @click="isMenuOpen = !isMenuOpen" class="text-[#d62f6a] focus:outline-none">
        <i class="bi bi-list text-3xl"></i>
      </button>
    </div>
    <div class="hidden lg:flex space-x-4 items-center">
      <ButtonAnimated buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" />
    </div>

    <transition name="fade">
      <div v-if="isMenuOpen" 
           class="fixed inset-0 lg:hidden z-10 bg-black bg-opacity-50 transition-opacity duration-300" 
           @click="isMenuOpen = false">
      </div>
    </transition>

    <transition name="slide-left">
      <div v-if="isMenuOpen" 
           class="fixed top-0 left-0 w-64 h-full shadow-lg lg:hidden bg-[#051f46] z-20 flex flex-col" 
           @click.stop>
        <div class="flex justify-between items-center p-4 border-b border-[#d62f6a]">
          <span class="text-[#d62f6a] font-bold text-xl">&lt;João Coelho /&gt;</span>
          <button @click="isMenuOpen = false" class="text-[#d62f6a] focus:outline-none">
            <i class="bi bi-x-lg text-2xl"></i>
          </button>
        </div>
        <nav class="flex flex-col mt-8 space-y-4 px-4">
          <FullButton size="w-full" buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" class="text-left"/>
          <FullButton size="w-full" buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" class="text-left"/>
          <FullButton size="w-full" buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" class="text-left"/>
          <FullButton size="w-full" buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" class="text-left"/>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import ButtonAnimated from '@/components/ButtonAnimated.vue';
import FullButton from '@/components/FullButton.vue';

const isMenuOpen = ref(false);
const emit = defineEmits(['scroll-to-section']);

const emitScrollToSection = (index) => {
  emit('scroll-to-section', index);
  isMenuOpen.value = false;
};
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  border: 0.3em solid rgba(5, 31, 70, 0.3);
  border-radius: 50%;
  border-top-color: #d62f6a;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
