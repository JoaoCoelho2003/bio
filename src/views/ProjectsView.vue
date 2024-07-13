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
            :images= '["/engweb/engweb2.png", "/engweb/engweb3.png", "/engweb/engweb4.png","/engweb/engweb5.png", "/engweb/engweb6.png", "/engweb/engweb7.png", "/engweb/engweb8.png"]'
            title="Braga Street Map - Web Engineering Project"
            description="Braga Street Map is a web application designed to provide comprehensive information about the various roads in Braga, Portugal. Developed with Elixir and Phoenix and deployed using Docker, the application offers a wide range of functionalities. Users can post new roads, comment on existing ones, and like or dislike other user's comments. Additionally, users have the option to export road data. The platform includes account management features such as login and registration, as well as user profiles that track engagement and allow for configuration changes to account information."
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