<template>
    <button
      class="text-[#d62f6a] border border-[#d62f6a] hover:bg-[#d62f6a] hover:text-black hover:border-black transition duration-300 ease-in-out py-2 px-4 rounded-lg"
      @click="handleClick"
      :disabled="isAnimating"
    >
      {{ buttonText }}
    </button>
  </template>
    
  <script>
  export default {
    props: {
      buttonText: {
        type: String,
        required: true
      },
      sectionIndex: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        isAnimating: false
      }
    },
    methods: {
      handleClick() {
        if (this.isAnimating) return
        this.$emit('scroll-to-section', this.sectionIndex)
      }
    }
  }
  </script>
  