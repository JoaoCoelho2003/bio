<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-green-500 mb-4">
            <EncryptingText text="Cyber Chronicles" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Explore the digital frontier through our curated collection of tech
            insights and cyberpunk musings.
          </p>
        </div>

        <div class="mb-8">
          <BlogFilters
            :posts="posts"
            :search-query="searchQuery"
            :selected-category="selectedCategory"
            :selected-tag="selectedTag"
            :sort-order="sortOrder"
            :filtered-count="filteredAndSortedPosts.length"
            @update:search-query="searchQuery = $event"
            @update:selected-category="selectedCategory = $event"
            @update:selected-tag="selectedTag = $event"
            @update:sort-order="sortOrder = $event"
          />
        </div>

        <div
          v-if="isLoading"
          class="min-h-[60vh] flex items-center justify-center"
        >
          <div class="text-center text-gray-400">
            <div
              class="inline-block border-2 border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent rounded-full w-12 h-12 animate-spin mb-4"
            ></div>
            <p class="text-lg">Decrypting data streams...</p>
          </div>
        </div>

        <div
          v-else-if="filteredAndSortedPosts.length === 0"
          class="min-h-[40vh] flex items-center justify-center"
        >
          <div class="text-center text-gray-400">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h3 class="text-xl font-semibold text-green-500 mb-2">No posts found</h3>
            <p class="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="post in filteredAndSortedPosts"
            :key="post.slug"
            class="bg-gray-900 border border-green-500 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
          >
            <img
              :src="post.thumbnail"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h2 class="text-xl font-bold text-green-500 mb-2">
                {{ post.title }}
              </h2>
              <p class="text-gray-400 mb-4">{{ post.excerpt }}</p>
              
              <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded-full border border-green-500/40 cursor-pointer hover:bg-green-500/20 transition-colors"
                  @click="selectedTag = tag"
                >
                  #{{ tag }}
                </span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{
                  formatDate(post.date)
                }}</span>
                <router-link
                  :to="{ name: 'blogPost', params: { slug: post.slug } }"
                  class="px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-400 transition-colors duration-300"
                >
                  Read More
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import BlogFilters from "@/components/BlogFilters.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "João Coelho - Welcome to My Blog",
  meta: [
    {
      name: "description",
      content:
        "Read insightful blog posts about software engineering, AI, and modern development trends.",
    },
  ],
});

const route = useRoute();
const matrix = ref(null);
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedTag = ref("");
const sortOrder = ref("newest");

const posts = ref([]);
const isLoading = ref(true);

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await fetch("/api/posts");
    posts.value = await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    isLoading.value = false;
  }
};

const filteredAndSortedPosts = computed(() => {
  let result = posts.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  if (selectedCategory.value) {
    result = result.filter((post) => post.category === selectedCategory.value);
  }

  if (selectedTag.value) {
    result = result.filter((post) => 
      post.tags && post.tags.includes(selectedTag.value)
    );
  }

  result.sort((a, b) => {
    switch (sortOrder.value) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  return result;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
  fetchPosts();
  const cleanup = initMatrix();
  onUnmounted(cleanup);
});
</script>

<style scoped>
@keyframes glitch {
  2%,
  64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%,
  60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg);
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
