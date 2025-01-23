<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />
    
    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-green-500 mb-4 glitch-text" data-text="Establish Connection">
            <EncryptingText text="Establish Connection" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate or have a question? Use this secure channel to get in touch.
          </p>
        </div>

        <div class="bg-black/80 border border-green-500/30 rounded-lg p-8">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="name" class="block text-green-500">Identifier</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  required
                  class="w-full bg-black/50 border border-green-500/30 rounded px-4 py-2 text-green-500 focus:outline-none focus:border-green-500 transition-colors duration-300"
                  placeholder="Enter your name"
                >
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-green-500">Communication Protocol</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  required
                  class="w-full bg-black/50 border border-green-500/30 rounded px-4 py-2 text-green-500 focus:outline-none focus:border-green-500 transition-colors duration-300"
                  placeholder="Enter your email"
                >
              </div>
            </div>
            <div class="space-y-2">
              <label for="message" class="block text-green-500">Transmission Content</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="6" 
                required
                class="w-full bg-black/50 border border-green-500/30 rounded px-4 py-2 text-green-500 focus:outline-none focus:border-green-500 transition-colors duration-300"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button type="submit" class="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 group">
                <span class="mr-2">Transmit</span>
                <i class="bi bi-arrow-right transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <i class="bi bi-geo-alt text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">Location</h3>
            <p class="text-gray-400">Braga, Portugal</p>
          </div>
          <div class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <i class="bi bi-envelope text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">Email</h3>
            <a href="mailto:jhcoelho03@gmail.com" class="text-gray-400 hover:text-green-500 transition-colors">jhcoelho03@gmail.com</a>
          </div>
          <div class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
            <i class="bi bi-linkedin text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/joaocoelho03/" target="_blank" class="text-gray-400 hover:text-green-500 transition-colors">joaocoelho03</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CyberHeader from '@/components/CyberHeader.vue'
import EncryptingText from '@/components/EncryptingText.vue'

const matrix = ref(null)

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = async () => {
  try {
    if (!formData.value.name || !formData.value.email || !formData.value.message) {
      alert('Please fill out all fields.');
      return;
    }

    const templateParams = {
      from_name: formData.value.name,
      from_email: formData.value.email,
      message: formData.value.message,
    };

    const response = await emailjs.send('service_hvhn77m', 'template_io155tt', templateParams, 'NEwmcvJG7nX5j2Pu0');

    if (response.status === 200) {
      formData.value.name = '';
      formData.value.email = '';
      formData.value.message = '';

      alert('Message sent successfully!');
    } else {
      console.error('Failed to send message:', response);
      alert('Failed to send message. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};

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
