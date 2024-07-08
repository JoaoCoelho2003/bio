<template>
    <button
    :class="[
      size === 'w-full' ? 'w-full' : '', 'text-[#d62f6a] hover:bg-[#d62f6a] hover:text-black transition duration-300 ease-in-out']"
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
      },
      size: {
        type: String,
        default: ''
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
  