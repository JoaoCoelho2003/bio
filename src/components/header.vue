<template>
    <header class="flex justify-between items-center p-4 bg-black">
      <div>
        <span class="text-cyan-400 font-bold text-3xl">João Coelho</span>
      </div>
      <div class="flex space-x-4">
        <ButtonAnimated buttonText="Home" route="/" />
        <ButtonAnimated buttonText="About" route="/about" />
        <ButtonAnimated buttonText="Skills" route="/skills" />
        <ButtonAnimated buttonText="Projects" route="/projects" />
        <ButtonAnimated buttonText="Contact" route="/contact" />
      </div>
    </header>
</template>
  
<script>
  import ButtonAnimated from '@/components/buttonAnimated.vue';
  
  export default {
    components: {
      ButtonAnimated
    }
  };
</script>

  