<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1
            class="text-4xl font-bold text-green-500 mb-4"
            data-text="Digital Creations"
          >
            <EncryptingText text="Digital Creations" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of projects, showcasing a blend of creativity
            and technical expertise.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(project, index) in projects"
            :key="project.title"
            class="cyber-project-card bg-black/80 border border-green-500/30 rounded-lg overflow-hidden transform opacity-0 translate-y-4 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-green-500/20 hover:scale-110 hover:opacity-100 cursor-pointer"
            :style="{ '--delay': `${index * 0.2}s` }"
            @click="openModal(project)"
          >
            <div class="relative overflow-hidden">
              <img
                :src="project.images[0]"
                :alt="project.title"
                class="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-70 flex items-end justify-start p-4 opacity-0 transition-opacity duration-300 hover:opacity-100"
              >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="bg-green-500 text-black text-xs px-2 py-1 rounded"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <h3 class="text-2xl font-bold text-green-500">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 line-clamp-3">
                {{ project.description.replace(/[#*\[\]]/g, '').split('\n').filter(line => line.trim()).slice(0, 3).join(' ').substring(0, 200) }}{{ project.description.length > 200 ? '...' : '' }}
              </p>
              <div class="flex space-x-4 mt-4">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <div class="space-y-1">
                    <i class="bi bi-globe"></i> Visit Site
                  </div>
                </a>
                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <div class="space-y-1">
                    <i class="bi bi-github"></i> View Code
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProjectModal
      :show="showModal"
      :project="selectedProject"
      @close="closeModal"
    />
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import ProjectModal from "@/components/ProjectModal.vue";
import { useHead } from "@vueuse/head";
import { initMatrix } from "@/lib/background";
import { useContent } from "@/composables/useContent";

const { getProjects, parseMarkdown } = useContent();

useHead({
  title: "Projects - João Coelho",
  link: [{ rel: "canonical", href: "https://joaocoelho.dev/projects" }],
  meta: [
    {
      name: "description",
      content:
        "Discover João Coelho's diverse portfolio of software engineering projects, featuring full stack development, blockchain, 3D rendering, image management, and more.",
    },
    { property: "og:title", content: "Projects - João Coelho" },
    { property: "og:description", content: "Discover João Coelho's diverse portfolio of software engineering projects, featuring full stack development, blockchain, 3D rendering, and more." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://joaocoelho.dev/projects" },
    { property: "og:image", content: "https://joaocoelho.dev/profile.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Projects - João Coelho" },
    { name: "twitter:description", content: "Discover João Coelho's diverse portfolio of software engineering projects." },
    { name: "twitter:image", content: "https://joaocoelho.dev/profile.png" },
  ],
});

const matrix = ref(null);
const showModal = ref(false);
const selectedProject = ref(null);
const projects = ref([]);

onMounted(async () => {
  projects.value = await getProjects();
  
  const cleanup = initMatrix(matrix);
  onUnmounted(cleanup);
});

const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

</script>

<style scoped>
.cyber-project-card {
  animation: fade-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
}

@keyframes fade-in-up {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
