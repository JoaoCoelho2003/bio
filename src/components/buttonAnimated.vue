<template>
  <button class="text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-black transition duration-300 ease-in-out py-2 px-4 rounded-lg" @click="navigateToRoute">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
      buttonText: {
          type: String,
          required: true
      },
      route: {
          type: String,
          required: true
      }
  },
  methods: {
      navigateToRoute() {
          this.$router.push(this.route);
      }
  }
};
</script>
