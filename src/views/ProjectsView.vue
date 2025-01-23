<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold mb-8 text-green-400">Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProjectCard
        v-for="project in projects"
        :key="project.title"
        :title="project.title"
        :description="project.description"
        :technologies="project.technologies"
        :images="project.images"
        :weburl="project.weburl"
        :giturl="project.giturl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectCard from '@/components/ProjectCard.vue';

const projects = ref([
  {
    title: "Dharma Network - NFT Marketplace",
    description: "Dharma Network is a decentralized NFT marketplace that allows users to buy and sell NFTs.",
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    images: ['/Dharma/dharmaLogo.png'],
    weburl: "https://www.mydharma.network/",
    giturl: null
  },
  {
    title: "3D Engine and Generator - Computer Graphics Project",
    description: "This project consists of a 3D engine and generator developed in C++ and OpenGL.",
    technologies: ['C++', 'OpenGL', 'CMake'],
    images: ['/CG/CG1.png', '/CG/CG2.png', '/CG/CG3.png', '/CG/CG4.png', '/CG/CG5.png'],
    weburl: null,
    giturl: "https://github.com/JoaoCoelho2003/CG"
  },
  {
    title: "Stroll Braga - Web Engineering Project",
    description: "Braga Street Map is a web application that provides information about the different roads in Braga, Portugal.",
    technologies: ['Elixir', 'Phoenix', 'Docker', 'HTML5', 'Tailwind CSS', 'JavaScript', 'Python'],
    images: ['/engweb/strollBraga.png'],
    weburl: null,
    giturl: "https://github.com/JoaoCoelho2003/EngwebProject"
  },
  {
    title: "Atomic - Academic Nucleus Social Network",
    description: "Atomic is a social network for academic nuclei that allows students to interact with each other.",
    technologies: ['Elixir', 'Phoenix', 'Docker', 'HTML5', 'Tailwind CSS'],
    images: ['/Atomic/atomic.png'],
    weburl: null,
    giturl: "https://github.com/cesium/atomic"
  }
]);
</script>
