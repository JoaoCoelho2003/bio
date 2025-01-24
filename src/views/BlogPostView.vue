<template>
    <div class="min-h-screen bg-black pt-16">
      <CyberHeader />
      
      <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>
  
      <div class="container mx-auto px-4 py-12">
        <div class="relative z-10 max-w-4xl mx-auto">
          <article v-if="post" class="bg-gray-900 border border-green-500 rounded-lg overflow-hidden p-8">
            <h1 class="text-4xl font-bold text-green-500 mb-4">{{ post.title }}</h1>
            <div class="mb-6 flex items-center text-gray-400">
              <span class="mr-4">{{ formatDate(post.date) }}</span>
              <span class="mr-4">|</span>
              <span>{{ post.category }}</span>
            </div>
            <img :src="post.thumbnail" :alt="post.title" class="w-full h-64 object-cover mb-8 rounded-lg" />
            <p class="prose prose-invert prose-green max-w-none">{{ post.body }}</p>
            <div class="mt-8">
              <h3 class="text-xl font-bold text-green-500 mb-2">Tags:</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-3 py-1 bg-green-500 text-black rounded-full text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
          <div v-else class="text-center text-gray-400">
            <p>Loading post...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRoute } from 'vue-router'
  import CyberHeader from '@/components/CyberHeader.vue'
  import dayjs from 'dayjs';
  
  const route = useRoute()
  const matrix = ref(null)
  const post = ref(null)
  
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${route.params.slug}`)
      post.value = await response.json()
    } catch (error) {
      console.error('Error fetching post:', error)
    }
  }
  
  onMounted(() => {
    fetchPost()
    const cleanup = initMatrix()
    onUnmounted(cleanup)
  })
  
  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
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
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
  }
  
  @keyframes glitch {
    2%, 64% {
      transform: translate(2px,0) skew(0deg);
    }
    4%, 60% {
      transform: translate(-2px,0) skew(0deg);
    }
    62% {
      transform: translate(0,0) skew(5deg); 
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
    15% {
      clip: rect(15px, 9999px, 72px, 0);
    }
    20% {
      clip: rect(38px, 9999px, 10px, 0);
    }
    25% {
      clip: rect(95px, 9999px, 43px, 0);
    }
    30% {
      clip: rect(22px, 9999px, 86px, 0);
    }
    35% {
      clip: rect(50px, 9999px, 31px, 0);
    }
    40% {
      clip: rect(77px, 9999px, 8px, 0);
    }
    45% {
      clip: rect(3px, 9999px, 67px, 0);
    }
    50% {
      clip: rect(41px, 9999px, 92px, 0);
    }
    55% {
      clip: rect(9px, 9999px, 55px, 0);
    }
    60% {
      clip: rect(70px, 9999px, 19px, 0);
    }
    65% {
      clip: rect(28px, 9999px, 78px, 0);
    }
    70% {
      clip: rect(46px, 9999px, 13px, 0);
    }
    75% {
      clip: rect(84px, 9999px, 37px, 0);
    }
    80% {
      clip: rect(1px, 9999px, 61px, 0);
    }
    85% {
      clip: rect(33px, 9999px, 96px, 0);
    }
    90% {
      clip: rect(59px, 9999px, 25px, 0);
    }
    95% {
      clip: rect(7px, 9999px, 82px, 0);
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
    15% {
      clip: rect(25px, 9999px, 48px, 0);
    }
    20% {
      clip: rect(53px, 9999px, 87px, 0);
    }
    25% {
      clip: rect(6px, 9999px, 35px, 0);
    }
    30% {
      clip: rect(94px, 9999px, 79px, 0);
    }
    35% {
      clip: rect(18px, 9999px, 56px, 0);
    }
    40% {
      clip: rect(81px, 9999px, 23px, 0);
    }
    45% {
      clip: rect(42px, 9999px, 69px, 0);
    }
    50% {
      clip: rect(10px, 9999px, 98px, 0);
    }
    55% {
      clip: rect(66px, 9999px, 4px, 0);
    }
    60% {
      clip: rect(30px, 9999px, 75px, 0);
    }
    65% {
      clip: rect(88px, 9999px, 17px, 0);
    }
    70% {
      clip: rect(2px, 9999px, 51px, 0);
    }
    75% {
      clip: rect(76px, 9999px, 40px, 0);
    }
    80% {
      clip: rect(14px, 9999px, 93px, 0);
    }
    85% {
      clip: rect(49px, 9999px, 8px, 0);
    }
    90% {
      clip: rect(97px, 9999px, 63px, 0);
    }
    95% {
      clip: rect(21px, 9999px, 85px, 0);
    }
    100% {
      clip: rect(53px, 9999px, 27px, 0);
    }
  }
  </style>  