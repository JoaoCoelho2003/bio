<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <h1
          class="text-8xl font-bold text-green-500 mb-4 glitch-text"
          data-text="404"
        >
          <EncryptingText text="404" />
        </h1>
        <p
          class="text-2xl text-gray-400 mb-8 glitch-text-subtle"
          data-text="System Malfunction: Page Not Found"
        >
          System Malfunction: Page Not Found
        </p>
        <p class="text-lg text-gray-500 mb-12">
          The requested data packet has been lost in the digital void.
        </p>
        <router-link
          to="/"
          class="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 group"
        >
          <i class="bi bi-house-door-fill mr-2"></i>
          <span>Return to Base</span>
          <i
            class="bi bi-arrow-right ml-2 transition-transform group-hover:translate-x-1"
          ></i>
        </router-link>
      </div>
    </div>

    <div class="glitch-overlay"></div>
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import EncryptingText from "@/components/EncryptingText.vue";

const matrix = ref(null);

const initMatrix = () => {
  const canvas = matrix.value;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
  const columns = canvas.width / 20;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = "15px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const interval = setInterval(draw, 33);
  return () => clearInterval(interval);
};

onMounted(() => {
  const cleanup = initMatrix();
  onUnmounted(cleanup);
});
</script>

<style scoped>
.glitch-text {
  position: relative;
  animation: glitch 1s linear infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow:
    -2px 0 #00fff9,
    2px 2px #ff00c1;
  animation: glitch-anim2 1s infinite linear alternate-reverse;
}

.glitch-text-subtle {
  position: relative;
  animation: glitch-subtle 2s linear infinite;
}

@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(64px, 9999px, 5px, 0);
  }
  5% {
    clip: rect(89px, 9999px, 99px, 0);
  }
  10% {
    clip: rect(58px, 9999px, 24px, 0);
  }
  100% {
    clip: rect(82px, 9999px, 34px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(39px, 9999px, 62px, 0);
  }
  5% {
    clip: rect(90px, 9999px, 100px, 0);
  }
  10% {
    clip: rect(72px, 9999px, 11px, 0);
  }
  100% {
    clip: rect(53px, 9999px, 27px, 0);
  }
}

@keyframes glitch-subtle {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

.glitch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  animation: scan 7s linear infinite;
}

@keyframes scan {
  0% {
    background-position: 0 -100vh;
  }
  35%,
  100% {
    background-position: 0 100vh;
  }
}
</style>
