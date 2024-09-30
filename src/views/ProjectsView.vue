<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

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
            description="Dharma Network is a decentralized NFT marketplace that allows users to buy and sell NFTs. The platform was developed using Vue.js, typescript, millisearch and tailwindcss."
            :technologies="['devicon-vuejs-plain colored', 'devicon-typescript-original colored', 'devicon-tailwindcss-original colored']"
            weburl = "https://www.mydharma.network/"
          />
          <ProjectBox
            :images= '["/CG/CG1.png", "/CG/CG2.png", "/CG/CG3.png","/CG/CG4.png", "/CG/CG5.png"]'
            title="3D Engine and Generator - Computer Graphics Project"
            description="This project consists of a 3D engine and generator developed in C++ and OpenGL. The engine is capable of rendering 3D models, applying textures, and performing transformations such as translation, rotation, and scaling. The generator allows users to create 3D models by defining vertices, edges, and faces. The application also includes a lighting system that simulates the effects of ambient, diffuse, and specular light. As part of the project, a demo of the solar system was created, showcasing the engine's capabilities. The engine and generator were developed as part of a Computer Graphics course at the University of Minho."
            :technologies="[ 'devicon-cplusplus-plain colored', 'devicon-opengl-plain colored', 'devicon-cmake-plain colored']"
            giturl="https://github.com/JoaoCoelho2003/CG"
          />
          <ProjectBox
            :images= '["/engweb/engweb2.png", "/engweb/engweb3.png", "/engweb/engweb4.png","/engweb/engweb5.png", "/engweb/engweb6.png", "/engweb/engweb7.png", "/engweb/engweb8.png"]'
            title="Braga Street Map - Web Engineering Project"
            description="Braga Street Map is a web application that provides information about the different roads in Braga, Portugal. It was developed using Elixir and Phoenix, and deployed using Docker."
            :technologies="['devicon-elixir-plain colored', 'devicon-phoenix-original colored', 'devicon-docker-plain colored', 'devicon-html5-plain colored', 'devicon-tailwindcss-original colored', 'devicon-javascript-plain colored', 'devicon-python-plain colored']"
            giturl="https://github.com/JoaoCoelho2003/EngwebProject"
          />
          <ProjectBox
            :images= '["/engweb/engweb2.png", "/engweb/engweb3.png", "/engweb/engweb4.png","/engweb/engweb5.png", "/engweb/engweb6.png", "/engweb/engweb7.png", "/engweb/engweb8.png"]'
            title="Braga Street Map - Web Engineering Project"
            description="Braga Street Map is a web application that provides information about the different roads in Braga, Portugal. It was developed using Elixir and Phoenix, and deployed using Docker."
            :technologies="['devicon-elixir-plain colored', 'devicon-phoenix-original colored', 'devicon-docker-plain colored', 'devicon-html5-plain colored', 'devicon-tailwindcss-original colored', 'devicon-javascript-plain colored', 'devicon-python-plain colored']"
            giturl="https://github.com/JoaoCoelho2003/EngwebProject"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProjectBox from '@/components/ProjectBox.vue';
</script>

<style scoped>
.underline-custom {
  border-bottom: 3px solid #d62f6a;
}
</style>