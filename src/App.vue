<template>
  <div class="bg-black min-h-screen text-green-500 font-mono">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <div>
          <component :is="Component" />
          <CyberFooter />
        </div>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import CyberFooter from "@/components/CyberFooter.vue";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
