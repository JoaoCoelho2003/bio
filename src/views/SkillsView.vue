<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold mb-8 text-green-400">Skills</h1>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg border border-green-500 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
      >
        <i :class="[skill.icon, 'text-4xl mb-2']"></i>
        <span class="text-sm text-center">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([
  { name: 'Python', icon: 'devicon-python-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { name: 'Elixir', icon: 'devicon-elixir-plain colored' },
  { name: 'Phoenix', icon: 'devicon-phoenix-plain colored' },
  { name: 'HTML5', icon: 'devicon-html5-plain colored' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain colored' },
  { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
  { name: 'C', icon: 'devicon-c-plain colored' },
  { name: 'Java', icon: 'devicon-java-plain colored' },
  { name: 'Haskell', icon: 'devicon-haskell-plain colored' },
  { name: 'Rust', icon: 'devicon-rust-plain colored' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { name: 'Express', icon: 'devicon-express-original colored' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
]);
</script>
