<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/30"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <router-link to="/" class="flex items-center space-x-2 group">
          <div
            class="w-8 h-8 border-2 border-green-500 rounded flex items-center justify-center group-hover:border-green-400 transition-colors duration-300"
          >
            <i
              class="bi bi-terminal-fill text-green-500 group-hover:text-green-400"
            ></i>
          </div>
          <span
            class="text-green-500 font-mono text-lg group-hover:text-green-400"
            >&lt;JC /&gt;</span
          >
        </router-link>

        <nav class="hidden md:flex space-x-6">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="relative cyber-link"
          >
            <span
              class="text-green-500 hover:text-green-400 transition-colors duration-300"
            >
              {{ item.name }}
            </span>
          </router-link>
        </nav>

        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-green-500 hover:text-green-400 focus:outline-none"
        >
          <i class="bi" :class="isMenuOpen ? 'bi-x-lg' : 'bi-list'"></i>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-black/95 border-b border-green-500/30"
      >
        <div class="px-4 py-2 space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="block py-2 text-green-500 hover:text-green-400 transition-colors duration-300"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const menuItems = [
  { name: "Home", path: "/home" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];
</script>

<style scoped>
.cyber-link::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #22c55e;
  transition: width 0.3s ease;
}

.cyber-link:hover::before {
  width: 100%;
}

.router-link-active {
  color: #22c55e;
}

.router-link-active::before {
  width: 100%;
}
</style>
