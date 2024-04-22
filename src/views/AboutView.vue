<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex items-center z-10">
    <div class="absolute top-0 left-0 p-40">
      <div class="text-white font-bold text-8xl">
        <span class="underline-custom">About Me</span>
      </div>
      <div class="text-white text-lg mt-10 font-light">
        <span>I am a third-year student of Software Engineering at the University of Minho.</span><br><br>
        <span>Throughout my academic journey, I have delved into various areas including Algorithms and Data Structures,</span><br>
        <span>Computer Networking, Distributed Systems, Formal Methods, Cybersecurity, Artificial Intelligence, etc.</span><br><br>
        <span>Additionally, I've been actively involved in initiatives like CoderDojo, where I've contributed my skills to teaching</span><br>
        <span>programming to kids aged 7-17.</span>
      </div>

      <div class="mt-10">
        <a href="https://github.com/JoaoCoelho2003" target="_blank" class="text-white text-4xl hover:text-[#d62f6a] transition-colors duration-300">
          <i class="bi bi-github"></i>
        </a>

        <a href="https://www.linkedin.com/in/joaocoelho03/" target="_blank" class="text-white text-4xl hover:text-[#d62f6a] transition-colors duration-300 ml-5">
          <i class="bi bi-linkedin"></i>
        </a>
      </div>

      <div class="mt-10">
        <a href="../../public/joaoCoelhoResume.pdf" target="_blank" class="text-xl text-[#d62f6a] border border-[#d62f6a] hover:bg-[#d62f6a] hover:text-black hover:border-black transition duration-300 ease-in-out py-4 px-8 rounded-2xl">Resume</a>
      </div>


    </div>
    </div>
  </div>
</template>

<style scoped>

.underline-custom {
  border-bottom: 3px solid #d62f6a;
}

</style>


