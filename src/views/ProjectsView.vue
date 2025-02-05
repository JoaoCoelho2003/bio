<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />
    
    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-green-500 mb-4 glitch-text" data-text="Digital Creations">
            <EncryptingText text="Digital Creations" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of projects, showcasing a blend of creativity and technical expertise.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(project, index) in projects" 
               :key="project.title"
               class="cyber-project-card bg-black/80 border border-green-500/30 rounded-lg overflow-hidden transform opacity-0 translate-y-4 hover:border-green-500 transition-all duration-300 shadow-lg hover:shadow-green-500/20 hover:scale-110 hover:opacity-100 cursor-pointer"
               :style="{ '--delay': `${index * 0.2}s` }"
               @click="openModal(project)">
            <div class="relative overflow-hidden">
                <img :src="project.images[0]" :alt="project.title" class="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110">
              <div class="absolute inset-0 bg-black bg-opacity-70 flex items-end justify-start p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div class="flex flex-wrap gap-2">
                  <span v-for="tech in project.technologies" :key="tech" class="bg-green-500 text-black text-xs px-2 py-1 rounded">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
            <div class="p-6 space-y-4">
              <h3 class="text-2xl font-bold text-green-500">{{ project.title }}</h3>
              <p class="text-gray-400">{{ project.description }}</p>
              <div class="flex space-x-4 mt-4">
                <a v-if="project.weburl" :href="project.weburl" target="_blank" class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  <div class="space-y-1">
                    <i class="bi bi-globe"></i> Visit Site
                  </div>
                </a>
                <a v-if="project.giturl" :href="project.giturl" target="_blank" class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
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

    <ProjectModal :show="showModal" :project="selectedProject" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CyberHeader from '@/components/CyberHeader.vue'
import EncryptingText from '@/components/EncryptingText.vue'
import ProjectModal from '@/components/ProjectModal.vue'

const matrix = ref(null)
const showModal = ref(false)
const selectedProject = ref(null)

const projects = ref([
  {
    title: "Dharma Network - NFT Marketplace",
    description: "A decentralized NFT marketplace allowing users to buy, sell, and trade unique digital assets securely on the blockchain.",
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Blockchain'],
    images: ['/Dharma/dharmaLogo.png'],
    weburl: "https://www.mydharma.network/",
    giturl: null,
    features: [
      "Secure wallet integration",
      "Real-time bidding system",
      "Customizable user profiles",
      "Advanced search and filtering options",
      "Buying and selling NFTs",
      "Trading NFTs"
    ]
  },
  {
    title: "3D Engine and Generator",
    description: "A powerful 3D engine and generator built with C++ and OpenGL, enabling real-time rendering and procedural content creation.",
    technologies: ['C++', 'OpenGL', 'CMake'],
    images: ['/CG/CG1.png', '/CG/CG2.png', '/CG/CG3.png', '/CG/CG4.png', '/CG/CG5.png'],
    weburl: null,
    giturl: "https://github.com/JoaoCoelho2003/CG",
    features: [
      "Real-time 3D rendering",
      "Procedural terrain generation",
      "Advanced lighting and shadow systems",
      "Physics simulation"
    ]
  },
  {
    title: "PictuRas",
    description: "A scalable image management and editing platform with advanced image tools, deployed using Kubernetes. The project features a Vue and TypeScript frontend, a JavaScript backend, and a microservices architecture.",
    technologies: ['Vue', 'TypeScript', 'JavaScript', 'Kubernetes', 'Helm', 'Minikube', 'Docker', 'CSS', 'HTML', 'HCL'],
    images: ['/Picturas/Picturas1.png', '/Picturas/Picturas2.png', '/Picturas/Picturas3.png','/Picturas/Picturas4.png', '/Picturas/Picturas5.png', '/Picturas/Picturas6.png','/Picturas/Picturas7.png', '/Picturas/Picturas8.png', '/Picturas/Picturas9.png', '/Picturas/Picturas10.png'],
    weburl: null,
    giturl: "https://github.com/JoaoCoelho2003/PictuRas",
    features: [
      "Image management and editing tools",
      "Frontend built with Vue and TypeScript",
      "Backend powered by JavaScript",
      "Scalable Kubernetes deployment",
      "Microservices architecture",
      "Email management via Mailhog",
      "RESTful API for backend operations"
    ]
  },
  {
    title: "Stroll Braga - City Explorer",
    description: "An interactive web application providing detailed information about roads and points of interest in Braga, Portugal.",
    technologies: ['Elixir', 'Phoenix', 'Docker', 'Tailwind CSS', 'JavaScript'],
    images: ['/engweb/strollBraga.png'],
    weburl: null,
    giturl: "https://github.com/JoaoCoelho2003/EngwebProject",
    features: [
      "Create posts about roads of Braga",
      "View historical data from city roads",
      "Comment on posts",
      "User interactions and discussions"
    ]
  },
  {
    title: "Atomic - Academic Social Network",
    description: "A social networking platform designed for academic nuclei, fostering collaboration and knowledge sharing among students.",
    technologies: ['Elixir', 'Phoenix', 'Docker', 'HTML5', 'Tailwind CSS'],
    images: ['/Atomic/atomic.png'],
    weburl: null,
    giturl: "https://github.com/cesium/atomic",
    features: [
      "User profiles with academic focus",
      "Project collaboration tools",
      "Event organization and management",
      "Organizations management"
    ]
  }
])

const initMatrix = () => {
  const canvas = matrix.value
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'
  const columns = canvas.width / 20
  const drops = Array(Math.floor(columns)).fill(1)

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#0F0'
    ctx.font = '15px monospace'
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(text, i * 20, drops[i] * 20)
      
      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const interval = setInterval(draw, 33)
  return () => clearInterval(interval)
}

const openModal = (project) => {
  selectedProject.value = project
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {
  const cleanup = initMatrix()
  onUnmounted(cleanup)
})
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
