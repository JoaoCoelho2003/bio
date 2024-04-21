<template>
    <button class="text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black hover:border-black transition duration-300 ease-in-out py-2 px-4 rounded-lg" @click="scrollToSection" :disabled="isAnimating">{{ buttonText }}</button>
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
      };
    },
    methods: {
        scrollToSection() {
            if (this.isAnimating) return;
            
            const sectionElement = document.querySelector(`#section-${this.sectionIndex}`);
            if (sectionElement) {
                const duration = 1000;
                this.isAnimating = true;
                smoothScrollTo(sectionElement, duration, () => {
                  this.isAnimating = false;
                });
            }
        }
    }
  };
  
  function smoothScrollTo(element, duration, onComplete) {
      const startPosition = window.pageYOffset;
      const targetPosition = element.offsetTop - document.querySelector('header').offsetHeight;
      const distance = targetPosition - startPosition;
      let startTime = null;
  
      const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const scrollProgress = Math.min(timeElapsed / duration, 1);
          const easing = (scrollProgress) => (scrollProgress < 0.5 ? 2 * scrollProgress ** 2 : 1 - 2 * (1 - scrollProgress) ** 2);
          window.scrollTo(0, startPosition + distance * easing(scrollProgress));
  
          if (timeElapsed < duration) {
              requestAnimationFrame(animation);
          } else {
              if (onComplete) onComplete();
          }
      };
  
      requestAnimationFrame(animation);
  }
  </script>
  