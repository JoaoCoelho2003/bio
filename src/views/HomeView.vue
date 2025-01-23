<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />
    
    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="cyber-card bg-black/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm shadow-lg shadow-green-500/10 relative overflow-hidden">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div class="relative">
                <img 
                  src="/profileHD.png" 
                  class="rounded-lg w-full object-cover border-2 border-green-500/50"
                  alt="Profile"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <h1 class="text-4xl font-bold text-green-500 mb-2 glitch-text" data-text="João Coelho">
                  <EncryptingText text="João Coelho" />
                </h1>
                <div class="h-8">
                  <TypingAnimation 
                    :texts="['Programmer', 'Full Stack Developer']" 
                    :speed="60" 
                    class="text-xl text-green-400"
                  />
                </div>
              </div>

              <p class="text-gray-400 leading-relaxed">
                I am a first-year Master's student in Software Engineering at the University of Minho. 
                My journey through computer science has equipped me with expertise in various domains, 
                from Algorithms to AI. I'm also proud to contribute to CoderDojo, nurturing future programmers.
              </p>

              <div class="flex space-x-4">
                <a href="https://github.com/JoaoCoelho2003" 
                   target="_blank"
                   class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  <i class="bi bi-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/joaocoelho03/" 
                   target="_blank"
                   class="inline-flex items-center space-x-2 px-4 py-2 border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                  <i class="bi bi-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </div>

              <a href="/joaoCoelhoResume.pdf" 
                 download 
                 class="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50">
                <i class="bi bi-file-earmark-text mr-2"></i>
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div v-for="(stat, index) in stats" 
               :key="index"
               class="cyber-stat bg-black/80 border border-green-500/30 rounded-lg p-4 text-center transform opacity-0 translate-y-4"
               :style="{ '--delay': `${index * 0.1}s` }">
            <div class="text-2xl text-green-500">{{ stat.value }}</div>
            <div class="text-sm text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CyberHeader from '@/components/CyberHeader.vue'
import TypingAnimation from '@/components/TypingAnimation.vue'
import EncryptingText from '@/components/EncryptingText.vue'
const matrix = ref(null)
const stats = ref([
  { label: 'Projects', value: '15+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Experience', value: '3 yrs' },
  { label: 'Contributions', value: '200+' }
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

onMounted(() => {
  const cleanup = initMatrix()
  onUnmounted(cleanup)
})
</script>

<style scoped>
.cyber-card::before {
  content: '';
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

.cyber-stat {
  animation: fade-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
}

@keyframes fade-in-up {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes holographic-sweep {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}
</style>