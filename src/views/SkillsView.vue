<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1
            class="text-4xl font-bold text-green-500 mb-4 glitch-text"
            data-text="Technical Arsenal"
          >
            <EncryptingText text="Technical Arsenal" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            An overview of my technical capabilities and expertise across
            various domains of software development.
          </p>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
        >
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="cyber-skill-card bg-black/80 border border-green-500/30 rounded-lg p-4 transform opacity-0 translate-y-4 hover:border-green-500 transition-all duration-300"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="text-4xl mb-4 text-center">
              <i :class="skill.icon"></i>
            </div>
            <div class="space-y-2">
              <h3 class="text-green-500 text-center font-medium">
                {{ skill.name }}
              </h3>
              <div class="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  class="level-bar h-full bg-green-500 transition-all duration-1000"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="cyber-category-card bg-black/80 border border-green-500/30 rounded-lg p-6 transform opacity-0 translate-y-4 hover:border-green-500 transition-all duration-300"
            :style="{ '--delay': `${index * 0.2}s` }"
          >
            <h3 class="text-xl font-bold text-green-500 mb-4">
              {{ category.title }}
            </h3>
            <p class="text-gray-400 mb-4">{{ category.description }}</p>
            <ul class="space-y-2">
              <li
                v-for="(tech, idx) in category.technologies"
                :key="idx"
                class="flex items-center text-gray-300"
              >
                <i class="bi bi-check2 text-green-500 mr-2"></i>
                {{ tech }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import EncryptingText from "@/components/EncryptingText.vue";

const matrix = ref(null);

const skills = ref([
  { name: "Python", icon: "devicon-python-plain colored", level: 95 },
  { name: "JavaScript", icon: "devicon-javascript-plain colored", level: 95 },
  { name: "TypeScript", icon: "devicon-typescript-plain colored", level: 95 },
  { name: "Elixir", icon: "devicon-elixir-plain colored", level: 90 },
  { name: "Phoenix", icon: "devicon-phoenix-plain colored", level: 90 },
  { name: "Vue.js", icon: "devicon-vuejs-plain colored", level: 90 },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", level: 85 },
  { name: "Html5", icon: "devicon-html5-plain colored", level: 90 },
  { name: "Git", icon: "devicon-git-plain colored", level: 90 },
  { name: "Tailwindcss", icon: "devicon-tailwindcss-plain colored", level: 90 },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", level: 85 },
  { name: "Css", icon: "devicon-css3-plain colored", level: 85 },
  { name: "Express", icon: "devicon-express-original", level: 85 },
  { name: "React", icon: "devicon-react-original colored", level: 80 },
  { name: "Java", icon: "devicon-java-plain colored", level: 80 },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", level: 80 },
  { name: "C++", icon: "devicon-cplusplus-plain colored", level: 75 },
  { name: "C", icon: "devicon-c-plain colored", level: 75 },
  { name: "Docker", icon: "devicon-docker-plain colored", level: 75 },
  { name: "Haskell", icon: "devicon-haskell-plain colored", level: 75 },
]);

const categories = ref([
  {
    title: "Frontend Development",
    description:
      "Creating responsive and interactive user interfaces with modern frameworks and tools.",
    technologies: [
      "Vue.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend Development",
    description:
      "Building robust server-side applications and APIs with various technologies.",
    technologies: [
      "Elixir",
      "Phoenix",
      "Node.js",
      "Python",
      "C++",
      "C",
      "Java",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "Haskell",
    ],
  },
  {
    title: "DevOps & Tools",
    description:
      "Implementing and maintaining development operations and tooling.",
    technologies: ["Git", "Docker"],
  },
]);

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
.cyber-skill-card {
  animation: fade-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
}

.level-bar {
  animation: level-animate 1.5s ease-out forwards;
  animation-delay: calc(var(--delay) + 0.5s);
}

.cyber-category-card {
  animation: fade-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
}

@keyframes level-animate {
  from {
    width: 0;
  }
}

@keyframes fade-in-up {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
