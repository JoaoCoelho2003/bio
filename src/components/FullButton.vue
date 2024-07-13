<template>
    <button
    :class="[
      size === 'w-full' ? 'w-full' : '', 'text-[#d62f6a] pb-4 pr-3 hover:text-[#e26a94] hover:text-xl text-lg border-b border-[#6b1533] transition duration-300 ease-in-out']"
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
  