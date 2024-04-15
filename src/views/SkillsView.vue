<template>
  <div id="app" style="background-color: black;">
    <Header />
    <div class="home text-cyan-400">
      <h1>Skills</h1>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'

export default {
  components: {
    Header
  }
};
</script>

<style scoped>
.skills {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: aqua;
  overflow: hidden;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  max-width: 80%;
  text-align: center;
}
</style>
