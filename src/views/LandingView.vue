<template>
    <div class="min-h-screen bg-black overflow-hidden relative">
      <canvas ref="matrix" class="fixed inset-0 opacity-20"></canvas>
  
      <div class="fixed inset-0 pointer-events-none glitch-overlay"></div>
  
      <div class="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <div class="mb-8 terminal-container">
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
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <template v-for="(panel, index) in panels" :key="panel.name">
            <div 
              class="holographic-panel"
              :class="{ 'panel-loaded': panelsLoaded }"
              :style="{ 'animation-delay': `${index * 0.2}s` }"
              @click="navigateTo(panel.route)"
            >
              <div class="panel-header">
                <div class="loading-bar" :style="{ width: `${loadingProgress}%` }"></div>
                <span class="panel-id">#{{ (index + 1).toString().padStart(2, '0') }}</span>
              </div>
  
              <div class="panel-content">
                <h2 class="text-2xl font-bold mb-4 text-green-400 glitch" :data-text="panel.name">
                  {{ panel.name }}
                </h2>
                
                <div class="panel-icon mb-4">
                  <i :class="panel.icon" class="text-4xl"></i>
                </div>
  
                <p class="text-gray-400 mb-4">{{ panel.description }}</p>
  
                <div class="status-indicators">
                  <div class="status-dot"></div>
                  <span class="status-text">SYSTEM READY</span>
                </div>
  
                <div class="enter-button">
                  <span class="text-green-500">> Enter_</span>
                </div>
              </div>
  
              <div class="panel-decorations">
                <div class="circuit-lines"></div>
                <div class="corner-accent top-left"></div>
                <div class="corner-accent top-right"></div>
                <div class="corner-accent bottom-left"></div>
                <div class="corner-accent bottom-right"></div>
              </div>
            </div>
          </template>
        </div>
  
        <div class="floating-elements">
          <div v-for="n in 5" :key="n" 
               class="floating-code"
               :style="{ 
                 '--delay': `${n * 2}s`,
                 '--duration': `${10 + n * 2}s`
               }">
            <pre><code>{{ randomCode() }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const matrix = ref(null)
  const typingComplete = ref(false)
  const showWelcome = ref(false)
  const panelsLoaded = ref(false)
  const loadingProgress = ref(0)
  
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
      name: 'Contact',
      description: 'Establish secure communication channel',
      route: '/contact',
      icon: 'bi bi-terminal-fill'
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
  
  const randomCode = () => {
    const snippets = [
      'const hack = async () => {',
      'while(true) { code() }',
      'if(coffee.empty) { refill() }',
      'class Matrix extends Reality',
      'function initSystem() {'
    ]
    return snippets[Math.floor(Math.random() * snippets.length)]
  }
  
  const navigateTo = (route) => {
    router.push(route)
  }
  
  onMounted(() => {
    const cleanup = initMatrix()
    
    setTimeout(() => {
      typingComplete.value = true
    }, 1000)
    
    setTimeout(() => {
      showWelcome.value = true
    }, 2000)
    
    const loadingInterval = setInterval(() => {
      if (loadingProgress.value < 100) {
        loadingProgress.value += 1
      } else {
        clearInterval(loadingInterval)
        panelsLoaded.value = true
      }
    }, 20)
  
    onUnmounted(() => {
      cleanup()
      clearInterval(loadingInterval)
    })
  })
  </script>
  
  <style scoped>
  .terminal-container {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid #0F0;
    border-radius: 8px;
    overflow: hidden;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .terminal-header {
    background: #1a1a1a;
    padding: 8px;
    display: flex;
    align-items: center;
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
  }
  
  .holographic-panel {
    background: rgba(16, 16, 24, 0.8);
    border: 1px solid rgba(0, 255, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .panel-loaded {
    transform: translateY(0);
    opacity: 1;
  }
  
  .holographic-panel::before {
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
  }
  
  .panel-header {
    border-bottom: 1px solid rgba(0, 255, 0, 0.2);
    margin-bottom: 16px;
    padding-bottom: 8px;
    position: relative;
  }
  
  .loading-bar {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    background: #0F0;
    transition: width 0.3s ease;
  }
  
  .panel-id {
    color: rgba(0, 255, 0, 0.5);
    font-family: monospace;
  }
  
  .status-indicators {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #0F0;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .status-text {
    font-size: 12px;
    color: rgba(0, 255, 0, 0.7);
    font-family: monospace;
  }
  
  .floating-elements {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }
  
  .floating-code {
    position: absolute;
    color: rgba(0, 255, 0, 0.3);
    font-family: monospace;
    font-size: 14px;
    animation: float-up var(--duration) linear var(--delay) infinite;
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
  
  @keyframes float-up {
    from {
      transform: translateY(100vh) rotate(var(--rotation, 0deg));
      opacity: 0;
    }
    10% { opacity: 1; }
    90% { opacity: 1; }
    to {
      transform: translateY(-100vh) rotate(var(--rotation, 0deg));
      opacity: 0;
    }
  }
  
  .glitch {
    position: relative;
  }
  
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  
  .glitch::before {
    animation: glitch-effect 3s infinite;
    color: #0ff;
    z-index: -1;
  }
  
  .glitch::after {
    animation: glitch-effect 2s infinite;
    color: #f0f;
    z-index: -2;
  }
  
  @keyframes glitch-effect {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-3px, 3px);
    }
    40% {
      transform: translate(-3px, -3px);
    }
    60% {
      transform: translate(3px, 3px);
    }
    80% {
      transform: translate(3px, -3px);
    }
    100% {
      transform: translate(0);
    }
  }
  
  .circuit-lines {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }
  
  .corner-accent {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 255, 0, 0.3);
  }
  
  .top-left {
    top: 0;
    left: 0;
    border-right: none;
    border-bottom: none;
  }
  
  .top-right {
    top: 0;
    right: 0;
    border-left: none;
    border-bottom: none;
  }
  
  .bottom-left {
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: none;
  }
  
  .bottom-right {
    bottom: 0;
    right: 0;
    border-left: none;
    border-top: none;
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
  
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #0F0 }
  }
  </style>