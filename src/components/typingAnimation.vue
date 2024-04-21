<template>
  <div class="relative" :style="{ fontSize: size, zIndex: zIndex}">
    <span class="inline-block text-white font-bold">I'm a&nbsp;</span>
    <span class="inline-block font-bold" :style="{ color: '#d62f6a' }">{{ typedText }}</span>
    <span class="absolute top-0 right-0 mt-1 mr-1 w-1 h-5 bg-[#d62f6a] rounded-sm" :class="{ 'animate-blink': showCursor }"></span>
  </div>
</template>

<script>
export default {
  props: {
    texts: {
      type: Array,
      required: true,
      default: () => []
    },
    speed: {
      type: Number,
      required: false,
      default: 100
    },
    size: {
      type: String,
      required: false,
      default: '1em'
    },
    zIndex: {
      type: Number,
      required: false,
      default: 20
    },
  },
  data() {
    return {
      typedText: '',
      currentIndex: 0,
      currentTextIndex: 0,
      showCursor: true
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const typeInterval = setInterval(() => {
        if (this.currentIndex < this.texts[this.currentTextIndex].length) {
          this.typedText += this.texts[this.currentTextIndex][this.currentIndex];
          this.currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            this.eraseText();
          }, 500);
        }
      }, this.speed);
    },
    eraseText() {
      const eraseInterval = setInterval(() => {
        if (this.typedText.length > 0) {
          this.typedText = this.typedText.slice(0, -1);
        } else {
          clearInterval(eraseInterval);
          this.currentIndex = 0;
          this.showCursor = true;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
          this.typeText();
        }
      }, this.speed);
    }
  }
};
</script>

<style scoped>
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}
</style>
