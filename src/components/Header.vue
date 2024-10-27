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
    <div class="hidden lg:flex space-x-4">
      <ButtonAnimated buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" />
    </div>

    <transition name="backdrop-fade">
      <div v-if="isMenuOpen" class="fixed inset-0 lg:hidden z-10 backdrop-blur-sm transition-opacity duration-300" @click="isMenuOpen = false"></div>
    </transition>

    <transition name="sidebar-slide">
      <div v-if="isMenuOpen" class="fixed top-0 right-0 w-1/2 h-full shadow-lg lg:hidden bg-[#051f46] z-20" @click.stop>
        <div class="relative flex flex-col items-center">
          <button @click="isMenuOpen = false" class="absolute top-2 text-[#d62f6a] focus:outline-none">
            <span class="text-[#d62f6a] font-bold text-xl">&lt;João Coelho /&gt;</span>
          </button>
          <div class="space-y-4 mt-4 px-2">
            <FullButton size="w-full" buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" class="mt-14 text-right"/>
            <FullButton size="w-full" buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" class="text-right"/>
            <FullButton size="w-full" buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" class="text-right"/>
            <FullButton size="w-full" buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" class="text-right"/>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import ButtonAnimated from '@/components/ButtonAnimated.vue';
import FullButton from '@/components/FullButton.vue';

const emit = defineEmits(['scroll-to-section'])
const isMenuOpen = ref(false)

const emitScrollToSection = (index) => {
  emit('scroll-to-section', index)
  isMenuOpen.value = false
}
</script>

<style scoped>
.sidebar-slide-enter-active, .sidebar-slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.sidebar-slide-enter, .sidebar-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.backdrop-fade-enter-active, .backdrop-fade-leave-active {
  transition: opacity 0.1s ease;
}
.backdrop-fade-enter, .backdrop-fade-leave-to {
  opacity: 0;
}
</style>
