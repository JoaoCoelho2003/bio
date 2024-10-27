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
      <span class="text-[#d62f6a]" v-if="loading">
        ✨ Loading visitor number... 🌟
      </span>
      <span class="text-[#d62f6a]" v-else>
        ✨ Hey! Visitor number <span class="text-xl font-bold text-[#d62f6a]">{{ visits }}</span>. Thanks for stopping by! 🌟
      </span>
      <ButtonAnimated buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" />
      <ButtonAnimated buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" />
    </div>

    <transition name="backdrop-fade">
      <div v-if="isMenuOpen" class="fixed inset-0 lg:hidden z-10 backdrop-blur-sm transition-opacity duration-300" @click="isMenuOpen = false"></div>
    </transition>

    <transition name="sidebar-slide">
      <div v-if="isMenuOpen" class="fixed top-0 right-0 w-2/3 h-full shadow-lg lg:hidden bg-[#051f46] z-20" @click.stop>
        <div class="relative flex flex-col items-center">
          <button @click="isMenuOpen = false" class="absolute top-2 text-[#d62f6a] focus:outline-none">
            <span class="text-[#d62f6a] font-bold text-xl">&lt;João Coelho /&gt;</span>
          </button>
          <div class="space-y-4 mt-4 px-2">
            <FullButton size="w-full" buttonText="Home" :sectionIndex="0" @scroll-to-section="emitScrollToSection" class="mt-14 text-right"/>
            <FullButton size="w-full" buttonText="Skills" :sectionIndex="1" @scroll-to-section="emitScrollToSection" class="text-right"/>
            <FullButton size="w-full" buttonText="Projects" :sectionIndex="2" @scroll-to-section="emitScrollToSection" class="text-right"/>
            <FullButton size="w-full" buttonText="Contact" :sectionIndex="3" @scroll-to-section="emitScrollToSection" class="text-right"/>
            <span class="text-[#d62f6a] text-sm" v-if="loading">
              ✨ Loading visitor number... 🌟
            </span>
            <span class="text-[#d62f6a] text-sm" v-else>
              ✨ Hey! Visitor number <span class="text-lg font-bold text-[#d62f6a]">{{ visits }}</span>. Thanks for stopping by! 🌟
            </span>
          </div>
        </div>
      </div>
    </transition>

    <div v-if="loading" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-30">
      <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ButtonAnimated from '@/components/ButtonAnimated.vue';
import FullButton from '@/components/FullButton.vue';

const isMenuOpen = ref(false);
const visits = ref(0);
const loading = ref(true);
const emit = defineEmits(['scroll-to-section']);

const fetchVisits = async () => {
  try {
    const response = await fetch('/.netlify/functions/counter');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    console.log('Fetched visits:', data);
    visits.value = data.visits;
  } catch (error) {
    console.error('Failed to fetch visit count:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchVisits();
});

const emitScrollToSection = (index) => {
  emit('scroll-to-section', index);
  isMenuOpen.value = false;
};
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
