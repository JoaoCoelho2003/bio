<template>
  <div class="relative">
    <!-- Background SVG -->
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col lg:flex-row items-center justify-center z-10">
      <div class="absolute top-0 left-0 p-10 lg:p-28 lg:w-2/4">
        <div class="text-white font-bold text-4xl lg:text-8xl">
          <span class="underline-custom">Skills</span>
        </div>
      </div>

      <div class="lg:w-2/3 lg:pl-20">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-10 mt-10">
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="rounded-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105"
          >
            <i :class="skill.icon" class="text-8xl text-white mb-2"></i>
            <span class="text-gray-400 text-lg font-semibold text-center">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Elixir', icon: 'devicon-elixir-plain' },
  { name: 'Phoenix', icon: 'devicon-phoenix-plain' },
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain' },
  { name: 'C++', icon: 'devicon-cplusplus-plain' },
  { name: 'C', icon: 'devicon-c-plain' },
  { name: 'Java', icon: 'devicon-java-plain' },
  { name: 'Haskell', icon: 'devicon-haskell-plain' },
  { name: 'Rust', icon: 'devicon-rust-plain' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'Express', icon: 'devicon-express-original' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
]);
</script>

<style scoped>
.underline-custom {
  border-bottom: 3px solid #d62f6a;
}
</style>
