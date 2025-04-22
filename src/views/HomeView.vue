<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto">
        <div
          class="cyber-card bg-black/80 border border-green-500/30 rounded-lg p-4 sm:p-8 backdrop-blur-sm shadow-lg shadow-green-500/10 relative overflow-hidden"
        >
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="relative group">
              <div
                class="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"
              ></div>
              <div class="relative">
                <img
                  src="/profileHD.jpeg"
                  class="rounded-lg w-full object-cover border-2 border-green-500/50"
                  alt="Profile"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"
                ></div>
              </div>
            </div>

            <div class="space-y-4 sm:space-y-6">
              <div>
                <h1
                  class="text-3xl sm:text-4xl font-bold text-green-500 mb-2 glitch-text"
                  data-text="João Coelho"
                >
                  <EncryptingText text="João Coelho" />
                </h1>
                <div class="h-8">
                  <TypingAnimation
                    :texts="['Programmer', 'Full Stack Developer']"
                    :speed="60"
                    class="text-lg sm:text-xl text-green-400"
                  />
                </div>
              </div>

              <p class="text-sm sm:text-base text-gray-400 leading-relaxed">
                I am a first-year Master's student in Software Engineering at
                the University of Minho. My journey through computer science has
                equipped me with expertise in various domains, from Algorithms
                to AI. I'm also proud to contribute to CoderDojo, nurturing
                future programmers.
              </p>

              <div class="flex flex-wrap gap-4">
                <a
                  href="https://github.com/JoaoCoelho2003"
                  target="_blank"
                  class="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base"
                >
                  <i class="bi bi-github"></i>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/joaocoelho03/"
                  target="_blank"
                  class="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base"
                >
                  <i class="bi bi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </div>

              <a
                href="/joaoCoelhoResume.pdf"
                download
                class="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base"
              >
                <i class="bi bi-file-earmark-text mr-2"></i>
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        <div class="space-y-12 mt-12">
          <div class="cyber-section">
            <h2
              class="text-2xl sm:text-3xl font-bold text-green-500 mb-6 flex items-center"
            >
              <i class="bi bi-cpu mr-3"></i>
              Education
            </h2>
            <div class="space-y-8">
              <div class="cyber-item relative pl-8 pb-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  Master's in Software Engineering
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  University of Minho
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Set. 2024 - Present
                </p>
              </div>
              <div class="cyber-item relative pl-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  Bachelor of Software Engineering
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  University of Minho
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Set. 2021 - Jul. 2024
                </p>
              </div>
            </div>
          </div>

          <div class="cyber-section">
            <h2
              class="text-2xl sm:text-3xl font-bold text-green-500 mb-6 flex items-center"
            >
              <i class="bi bi-terminal mr-3"></i>
              Experience
            </h2>
            <div class="space-y-8">
              <div class="cyber-item relative pl-8 pb-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  Software Engineer Intern
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  <a
                    href="https://www.yarilabs.com/"
                    target="_blank"
                    class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
                  >
                    Yari Labs
                    <i class="bi bi-box-arrow-up-right ml-2"></i>
                  </a>
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Jun. 2024 - Jul. 2024 | Braga, PT
                </p>
              </div>
              <div class="cyber-item relative pl-8 pb-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  Python Mentor
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  <a
                    href="https://coderdojobraga.org/"
                    target="_blank"
                    class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
                  >
                    CoderDojo
                    <i class="bi bi-box-arrow-up-right ml-2"></i>
                  </a>
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Mar. 2024 - Present | Braga, PT
                </p>
              </div>
              <div class="cyber-item relative pl-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  CAOS Collaborator
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  <a
                    href="https://cesium.di.uminho.pt/"
                    target="_blank"
                    class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
                  >
                    Cesium
                    <i class="bi bi-box-arrow-up-right ml-2"></i>
                  </a>
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Mar. 2024 - Present | Braga, PT
                </p>
              </div>
            </div>
          </div>
          <div class="cyber-section">
            <h2
              class="text-2xl sm:text-3xl font-bold text-green-500 mb-6 flex items-center"
            >
              <i class="bi bi-trophy mr-3"></i>
              Awards & Achievements
            </h2>
            <div class="space-y-8">
              <div class="cyber-item relative pl-8 pb-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  Overall Winner
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  <a
                    href="https://bugsbyte.org/"
                    target="_blank"
                    class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
                  >
                    BugsByte Hackathon 2025
                    <i class="bi bi-box-arrow-up-right ml-2"></i>
                  </a>
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Mar. 2025 | Braga, PT
                </p>
              </div>
              <div class="cyber-item relative pl-8 pb-8">
                <div class="cyber-dot"></div>
                <h3
                  class="text-lg sm:text-xl font-semibold text-green-400 mb-2"
                >
                  SingleStore Theme Prize Winner
                </h3>
                <p class="text-sm sm:text-base text-gray-400">
                  <a
                    href="https://bugsbyte.org/"
                    target="_blank"
                    class="inline-flex items-center space-x-2 hover:text-green-500 transition-all duration-300"
                  >
                    BugsByte Hackathon 2025
                    <i class="bi bi-box-arrow-up-right ml-2"></i>
                  </a>
                </p>
                <p class="text-xs sm:text-sm text-green-500/70 mt-1">
                  Mar. 2025 | Braga, PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import TypingAnimation from "@/components/TypingAnimation.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "João Coelho - About Me",
  meta: [
    {
      name: "description",
      content:
        "Learn more about João Coelho, his experience, resume, and journey in software engineering.",
    },
  ],
});

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
  window.addEventListener("resize", () => {
    if (matrix.value) {
      matrix.value.width = window.innerWidth;
      matrix.value.height = window.innerHeight;
    }
  });
  onUnmounted(() => {
    cleanup();
    window.removeEventListener("resize", () => {});
  });
});
</script>

<style scoped>
.cyber-card::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(34, 197, 94, 0.1) 45%,
    rgba(34, 197, 94, 0.2) 50%,
    rgba(34, 197, 94, 0.1) 55%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: holographic-sweep 3s linear infinite;
}

.cyber-section {
  position: relative;
  overflow: hidden;
}

.cyber-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #22c55e, transparent);
  animation: cyber-line 4s linear infinite;
}

.cyber-item {
  position: relative;
  transition: all 0.3s ease;
  padding-left: 32px;
}

.cyber-item:hover {
  transform: translateX(10px);
}

.cyber-item::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(34, 197, 94, 0.3);
}

.cyber-dot {
  position: absolute;
  left: 0;
  top: 8px;
  width: 14px;
  height: 14px;
  background-color: black;
  border: 2px solid #22c55e;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 2;
}

.cyber-item:hover .cyber-dot {
  background-color: #22c55e;
  box-shadow: 0 0 10px #22c55e;
  transform: scale(1.1);
}

@keyframes holographic-sweep {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@keyframes cyber-line {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 640px) {
  .cyber-item {
    padding-left: 24px;
  }

  .cyber-item::before {
    left: 4px;
  }

  .cyber-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
