<template>
  <div id="app" style="background-color: black;">
    <Header />
    <div class="home">
      <TypingAnimation :texts="['Programmer', 'Full Stack Developer']" size="3em" :speed="60" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import TypingAnimation from '@/components/typingAnimation.vue'

export default {
  components: {
    Header,
    TypingAnimation
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
