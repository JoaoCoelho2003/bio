<template>
  <header class="flex justify-between items-center p-4 shadow-md z-50 bg-[#051f46]">
    <div>
      <span class="text-[#d62f6a] font-bold text-2xl lg:text-3xl">João Coelho</span>
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

    <transition name="sidebar-slide">
      <div v-if="isMenuOpen" class="fixed inset-0 lg:hidden" @click="isMenuOpen = false"></div>
    </transition>

    <transition name="sidebar-slide">
      <div v-if="isMenuOpen" class="fixed top-0 right-0 w-3/5 h-full shadow-lg z-50 lg:hidden bg-[#051f46] border-l border-[#d62f6a]" @click.stop>
        <div class="relative flex flex-col items-center">
          <button @click="isMenuOpen = false" class="absolute top-4 right-4 text-[#d62f6a] focus:outline-none">
            <i class="bi bi-x-lg text-2xl"></i>
          </button>
          <FullButton size="w-full" buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" class="p-2 mt-14"/>
          <FullButton size="w-full" buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" class="p-2"/>
          <FullButton size="w-full" buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" class="p-2"/>
          <FullButton size="w-full" buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" class="p-2"/>
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
}
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.sidebar-slide-enter-active, .sidebar-slide-leave-active {
  transition: transform 0.5s ease;
}
.sidebar-slide-enter, .sidebar-slide-leave-to {
  transform: translateX(100%);
}
</style>