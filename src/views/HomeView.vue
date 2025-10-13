<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto">
        <div
          class="relative bg-black/80 border border-green-500/30 rounded-lg p-4 sm:p-8 backdrop-blur-sm shadow-lg shadow-green-500/10 overflow-hidden"
        >
          <div
            class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-green-500/10 to-transparent rotate-45 animate-sweep pointer-events-none"
          ></div>

          <div class="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div class="relative group">
              <div
                class="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"
              ></div>
              <div class="relative">
                <img
                  src="/profile.png"
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
                <h1 class="text-3xl sm:text-4xl font-bold text-green-500 mb-2">
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

              <router-link
                to="/cv"
                class="inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base"
              >
                <i class="bi bi-file-earmark-text mr-2"></i>
                <span>View CV</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="space-y-12 mt-12">
          <TimelineSection
            title="Education"
            icon="bi bi-cpu"
            :items="educationItems"
          />

          <TimelineSection
            title="Experience"
            icon="bi bi-terminal"
            :items="experienceItems"
          />

          <TimelineSection
            title="Awards & Achievements"
            icon="bi bi-trophy"
            :items="achievementItems"
          />
        </div>
      </div>
    </div>
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import TypingAnimation from "@/components/TypingAnimation.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import TimelineSection from "@/components/TimelineSection.vue";
import { useHead } from "@vueuse/head";
import { initMatrix } from "@/lib/background";

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

const educationItems = [
  {
    title: "Master's in Software Engineering",
    organization: "University of Minho",
    period: "Set. 2024 - Present",
    location: "Braga, PT",
  },
  {
    title: "Bachelor of Software Engineering",
    organization: "University of Minho",
    period: "Set. 2021 - Jul. 2024",
    location: "Braga, PT",
  },
];

const experienceItems = [
  {
    title: "CeSIUM",
    organization: "CeSIUM",
    link: "https://cesium.di.uminho.pt/",
    location: "Braga, PT",
    subItems: [
      {
        title: "Co-Director of CAOS (Department of Technology)",
        period: "Oct. 2025 - Present",
      },
      {
        title: "Collaborator of CAOS (Department of Technology)",
        period: "Mar. 2024 - Oct. 2025",
      },
    ],
  },
  {
    title: "Software Engineer Intern",
    organization: "Yari Labs",
    link: "https://www.yarilabs.com/",
    period: "Jun. 2024 - Jul. 2024",
    location: "Braga, PT",
  },
  {
    title: "Python Mentor",
    organization: "CoderDojo",
    link: "https://coderdojobraga.org/",
    period: "Mar. 2024 - Present",
    location: "Braga, PT",
  }
];

const achievementItems = [
  {
    title: "BugsByte Hackathon 2025",
    organization: "BugsByte Hackathon 2025",
    link: "https://bugsbyte.org/",
    period: "Mar. 2025",
    location: "Braga, PT",
    subItems: [
      {
        title: "Overall Winner",
        description: "First place overall in the hackathon competition",
      },
      {
        title: "SingleStore Theme Prize Winner",
        description: "Best project using SingleStore database technology",
      },
    ],
  },
];

onMounted(() => {
  const cleanup = initMatrix(matrix);
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
@keyframes sweep {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.animate-sweep {
  animation: sweep 3s linear infinite;
}
</style>
