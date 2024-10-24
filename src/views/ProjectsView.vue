<template>
  <AppLayout>
    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col lg:flex-row items-center justify-center z-10">
      <div class="absolute top-0 text-center p-6 lg:p-10 lg:w-2/4">
        <div class="text-white font-bold text-4xl lg:text-8xl">
          <span class="underline-custom">Projects</span>
        </div>
      </div>

      <div class="mb-5">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-4">
          <ProjectBox 
            :images= '["/Dharma/dharmaLogo.png"]'
            title="Dharma Network - NFT Marketplace"
            description="Dharma Network is a decentralized NFT marketplace that allows users to buy and sell NFTs."
            :technologies="['devicon-vuejs-plain colored', 'devicon-typescript-original colored', 'devicon-tailwindcss-original colored']"
            weburl = "https://www.mydharma.network/"
          />
          <ProjectBox
            :images= '["/CG/CG1.png", "/CG/CG2.png", "/CG/CG3.png","/CG/CG4.png", "/CG/CG5.png"]'
            title="3D Engine and Generator - Computer Graphics Project"
            description="This project consists of a 3D engine and generator developed in C++ and OpenGL."
            :technologies="[ 'devicon-cplusplus-plain colored', 'devicon-opengl-plain colored', 'devicon-cmake-plain colored']"
            giturl="https://github.com/JoaoCoelho2003/CG"
          />
          <ProjectBox
            :images= '["/engweb/strollBraga.png"]'
            title="Stroll Braga - Web Engineering Project"
            description="Braga Street Map is a web application that provides information about the different roads in Braga, Portugal."
            :technologies="['devicon-elixir-plain colored', 'devicon-phoenix-original colored', 'devicon-docker-plain colored', 'devicon-html5-plain colored', 'devicon-tailwindcss-original colored', 'devicon-javascript-plain colored', 'devicon-python-plain colored']"
            giturl="https://github.com/JoaoCoelho2003/EngwebProject"
          />
          <ProjectBox
            :images= '["/Atomic/atomic.png"]'
            title="Atomic - Academic Nucleus Social Network"
            description="Atomic is a social network for academic nuclei that allows students to interact with each other."
            :technologies="['devicon-elixir-plain colored', 'devicon-phoenix-original colored', 'devicon-docker-plain colored', 'devicon-html5-plain colored', 'devicon-tailwindcss-original colored']"
            giturl="https://github.com/cesium/atomic"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import ProjectBox from '@/components/ProjectBox.vue';
import AppLayout from '@/components/AppLayout.vue';
</script>

<style scoped>
.underline-custom {
  border-bottom: 3px solid #d62f6a;
}
</style>