<template>
    <button
    :class="[
      size === 'w-full' ? 'w-full' : '', 'text-[#d62f6a] pb-2 hover:text-[#9a1e4a] hover:text-xl text-lg border-b border-[#03285d] transition duration-300 ease-in-out']"
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
  