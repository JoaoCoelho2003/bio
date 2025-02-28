<template>
  <div class="min-h-screen bg-black overflow-hidden relative">
    <canvas ref="matrix" class="fixed inset-0 opacity-20"></canvas>
    <div class="fixed inset-0 pointer-events-none"></div>

    <div 
      v-if="showInitialAnimation" 
      class="relative z-20 min-h-screen flex items-center justify-center transition-opacity duration-1000"
      :class="{ 'opacity-0': fadeOutAnimation }"
    >
      <div class="terminal-container w-[90%] max-w-3xl mx-auto">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="terminal-title">system_access.sh</div>
        </div>
        <div class="terminal-body">
          <div class="typewriter-text" :class="{ 'typing-complete': typingComplete }">
            <span class="text-green-500">root@system</span>:<span class="text-blue-500">~</span>$ Initializing system access...
            <br>
            <span v-if="showWelcome">Welcome to João Coelho's digital realm_</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="animationComplete" class="relative z-10 min-h-screen">
      <header class="cyberpunk-header">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-4xl md:text-6xl font-bold text-green-400 glitch mb-2" data-text="JOÃO COELHO">
            <EncryptingText text="JOÃO COELHO" />
          </h1>
          <div class="flex items-center">
            <div class="status-dot"></div>
            <span class="text-green-500 ml-2 text-sm">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      <main class="container mx-auto px-4 py-8">
        <div class="cyberpunk-terminal bg-black/70 border border-green-500/30 rounded-lg p-5 relative overflow-hidden">
          <div class="terminal-header mb-4 relative">
            <div class="terminal-buttons">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="terminal-title">navigation_system.exe</div>
            <div class="loading-bar" :style="{ width: `${loadingProgress}%` }"></div>
          </div>

          <div v-if="loadingProgress < 100" class="hacking-animation">
            <div class="code-scroll">
              <pre v-for="(line, index) in codeLines" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">{{ line }}</pre>
            </div>
            <div class="access-messages">
              <div v-for="(message, index) in accessMessages" :key="index" 
                   :class="{ 'message-appear': loadingProgress >= (index + 1) * 20 }"
                   :style="{ animationDelay: `${index * 0.2}s` }">
                {{ message }}
              </div>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div>
                <div 
                  v-for="(panel, index) in panels.slice(0, 3)" 
                  :key="panel.name"
                  class="terminal-command mb-5 bg-black/50 border border-green-500/20 rounded p-4 cursor-pointer transition-all duration-300 ease-in-out"
                  :class="{ 'command-loaded': panelsLoaded }"
                  :style="{ 'animation-delay': `${index * 0.2}s` }"
                  @click="navigateTo(panel.route)"
                >
                  <div class="flex items-center gap-2 mb-2.5 font-mono">
                    <span class="text-green-500">></span>
                    <span class="text-green-500">cd ./{{ panel.name.toLowerCase() }}</span>
                  </div>
                  <div class="pl-5 border-l border-dashed border-green-500/30">
                    <div class="flex items-center mb-2">
                      <i :class="panel.icon" class="text-2xl mr-3 text-green-400"></i>
                      <h3 class="text-xl font-bold text-green-400">{{ panel.name }}</h3>
                    </div>
                    <p class="text-gray-400">{{ panel.description }}</p>
                    <div class="inline-block mt-2 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded">
                      <span class="text-green-500 text-sm">PRESS TO EXECUTE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div 
                  v-for="(panel, index) in panels.slice(3)" 
                  :key="panel.name"
                  class="terminal-command mb-5 bg-black/50 border border-green-500/20 rounded p-4 cursor-pointer transition-all duration-300 ease-in-out"
                  :class="{ 'command-loaded': panelsLoaded }"
                  :style="{ 'animation-delay': `${(index + 3) * 0.2}s` }"
                  @click="navigateTo(panel.route)"
                >
                  <div class="flex items-center gap-2 mb-2.5 font-mono">
                    <span class="text-green-500">></span>
                    <span class="text-green-500">cd ./{{ panel.name.toLowerCase() }}</span>
                  </div>
                  <div class="pl-5 border-l border-dashed border-green-500/30">
                    <div class="flex items-center mb-2">
                      <i :class="panel.icon" class="text-2xl mr-3 text-green-400"></i>
                      <h3 class="text-xl font-bold text-green-400">{{ panel.name }}</h3>
                    </div>
                    <p class="text-gray-400">{{ panel.description }}</p>
                    <div class="inline-block mt-2 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded">
                      <span class="text-green-500 text-sm">PRESS TO EXECUTE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-dashed border-green-500/30 pt-5">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(stat, index) in stats" :key="index" class="bg-black/50 border border-green-500/20 rounded p-2.5">
                <div class="text-xs text-green-500/70 mb-1">{{ stat.name }}</div>
                <div class="text-lg font-bold text-green-500 mb-1">{{ stat.value.toFixed(1) }}%</div>
                <div class="h-1 bg-green-500/10 rounded overflow-hidden">
                  <div class="stat-fill h-full" :style="{ width: `${stat.value}%` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="showPasswordModal" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 p-5 rounded-lg z-50">
      <div class="bg-gray-900 p-5 rounded-lg border border-green-500 text-green-500">
        <h3 class="text-lg text-center">Set Your Password</h3>
        <input 
          v-model="password" 
          type="password" 
          placeholder="Enter password" 
          class="w-full p-2.5 my-2.5 rounded bg-black border border-green-500 text-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" 
        />
        <button 
          @click="setPassword" 
          class="w-full bg-green-500/20 text-green-500 py-2.5 px-5 border border-green-500 rounded cursor-pointer transition-all duration-300 hover:bg-green-500/40"
        >
          Set Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import netlifyIdentity from 'netlify-identity-widget'
import EncryptingText from '@/components/EncryptingText.vue'

const router = useRouter()
const matrix = ref(null)
const typingComplete = ref(false)
const showWelcome = ref(false)
const panelsLoaded = ref(false)
const loadingProgress = ref(0)
const showPasswordModal = ref(false)
const password = ref('')
const animationComplete = ref(false)
const showInitialAnimation = ref(true)
const fadeOutAnimation = ref(false)

const codeLines = ref([
  "function hack() {",
  "  const target = 'mainframe';",
  "  const method = 'bruteforce';",
  "  return compromise(target, method);",
  "}",
  "async function compromise(t, m) {",
  "  const result = await exploit(t, m);",
  "  return result.success;",
  "}",
  "// Initializing hack sequence...",
  "hack().then(success => {",
  "  if (success) console.log('Access granted');",
  "});",
])

const accessMessages = ref([
  "BYPASSING FIREWALL...",
  "CRACKING ENCRYPTION...",
  "INJECTING PAYLOAD...",
  "ESCALATING PRIVILEGES...",
  "ACCESS GRANTED"
])

const panels = ref([
  { 
    name: 'Home',
    description: 'Access main terminal and system overview',
    route: '/home',
    icon: 'bi bi-house-door-fill'
  },
  { 
    name: 'Skills',
    description: 'View technical specifications and capabilities',
    route: '/skills',
    icon: 'bi bi-gear-fill'
  },
  { 
    name: 'Projects',
    description: 'Browse through completed operations',
    route: '/projects',
    icon: 'bi bi-folder-fill'
  },
  { 
    name: 'Blog',
    description: 'Access encrypted thought protocols',
    route: '/blog',
    icon: 'bi bi-journal-code'
  },
  { 
    name: 'Contact',
    description: 'Establish secure communication channel',
    route: '/contact',
    icon: 'bi bi-terminal-fill'
  }
])

const stats = ref([
  { name: 'CPU', value: 98 },
  { name: 'MEMORY', value: 86 },
  { name: 'NETWORK', value: 72 },
  { name: 'SECURITY', value: 100 },
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

const navigateTo = (route) => {
  router.push(route)
}

const handleInviteToken = (token) => {
  netlifyIdentity.acceptInvite(token, true)
    .then(() => {
      showPasswordModal.value = true
    })
    .catch((err) => {
      console.error('Invite error:', err)
    })
}

const setPassword = () => {
  if (password.value) {
    console.log('Password set:', password.value)
    showPasswordModal.value = false
  }
}

const updateStats = () => {
  stats.value.forEach((stat, index) => {
    if (index === 3) return; // Keep SECURITY at 100%
    const change = (Math.random() - 0.5) * 2 // Random value between -1 and 1
    stat.value = Math.max(0, Math.min(100, stat.value + change))
  })
}

onMounted(() => {
  const cleanup = initMatrix()
  
  setTimeout(() => {
    typingComplete.value = true
  }, 1000)
  
  setTimeout(() => {
    showWelcome.value = true
  }, 2000)
  
  setTimeout(() => {
    fadeOutAnimation.value = true
  }, 3000)
  
  setTimeout(() => {
    showInitialAnimation.value = false
    animationComplete.value = true
    
    const loadingInterval = setInterval(() => {
      if (loadingProgress.value < 100) {
        loadingProgress.value += 2.5
      } else {
        clearInterval(loadingInterval)
        panelsLoaded.value = true
      }
    }, 20)
    
    onUnmounted(() => {
      cleanup()
      clearInterval(loadingInterval)
    })
  }, 4000)

  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const inviteToken = params.get('invite_token')

  if (inviteToken) {
    handleInviteToken(inviteToken)
  }

  const statUpdateInterval = setInterval(updateStats, 100) // Update every 100ms for smooth animation

  onUnmounted(() => {
    cleanup()
    clearInterval(loadingInterval)
    clearInterval(statUpdateInterval)
  })
})
</script>

<style scoped>
.terminal-container {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #0F0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  transition: opacity 0.1s ease-out;
}

.terminal-header {
  background: #1a1a1a;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;
}

.terminal-buttons {
  display: flex;
  gap: 6px;
  margin-right: 16px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FF5F56;
}

.terminal-buttons span:nth-child(2) {
  background: #FFBD2E;
}

.terminal-buttons span:nth-child(3) {
  background: #27C93F;
}

.terminal-title {
  color: #666;
  font-size: 14px;
}

.terminal-body {
  padding: 16px;
  font-family: 'Source Code Pro', monospace;
  color: #0F0;
}

.typewriter-text {
  overflow: hidden;
  white-space: pre-line;
  border-right: 2px solid #0F0;
  animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

.typing-complete {
  border-right: none;
}

.cyberpunk-header {
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid rgba(0, 255, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.cyberpunk-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #0F0, transparent);
  animation: scan-line 2s linear infinite;
}

.loading-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #0F0;
  transition: width 0.3s ease;
}

.terminal-command {
  transform: translateY(20px);
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.terminal-command:hover {
  border-color: rgba(0, 255, 0, 0.6) !important;
  background: rgba(0, 255, 0, 0.1) !important;
}

.terminal-command::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(0, 255, 0, 0.1) 45%,
    rgba(0, 255, 0, 0.2) 50%,
    rgba(0, 255, 0, 0.1) 55%,
    transparent 100%
  );
  transform: rotate(45deg);
  animation: holographic-sweep 3s linear infinite;
  pointer-events: none;
}

.command-loaded {
  transform: translateY(0);
  opacity: 1;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #0F0;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.stat-fill {
  background: #0F0;
  transition: width 0.1s ease-in-out;
}

.hacking-animation {
  height: 300px;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', monospace;
}

.code-scroll {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.code-scroll pre {
  color: #0F0;
  font-size: 12px;
  margin: 0;
  white-space: pre-wrap;
  animation: scrollUp 10s linear infinite;
  opacity: 0;
}

.access-messages {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.access-messages div {
  color: #0F0;
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
}

.access-messages div.message-appear {
  opacity: 1;
  transform: scale(1);
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #0F0 }
}

@keyframes holographic-sweep {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes scan-line {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes scrollUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}

@keyframes glitchEffect {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.1;
  }
}
</style>