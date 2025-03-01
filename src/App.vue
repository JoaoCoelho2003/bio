<template>
  <div class="bg-black min-h-screen text-green-500 font-mono">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useHead } from "@vueuse/head";

useHead({
  title: "João Coelho - Software Engineer",
  meta: [
    {
      name: "description",
      content:
        "Welcome to João Coelho’s personal website. Explore projects, skills, and blog posts about software development and technology.",
    },
  ],
});
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
