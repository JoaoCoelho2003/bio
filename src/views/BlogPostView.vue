<template>
  <div class="min-h-screen bg-black">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-5"></canvas>

    <router-link
      to="/blog"
      class="fixed top-20 left-4 z-50 px-4 py-2 bg-black border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center gap-2 group"
    >
      <span class="relative overflow-hidden">
        <span
          class="block transform group-hover:-translate-x-full transition-transform duration-300"
          >&lt;</span
        >
        <span
          class="block absolute top-0 right-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
          >&lt;&lt;</span
        >
      </span>
      <span class="hidden sm:inline">Back</span>
    </router-link>

    <main class="relative z-10 pt-16">
      <article v-if="post" class="max-w-[100rem] mx-auto">
        <div class="relative h-[40vh] sm:h-[50vh] min-h-[300px] w-full mb-8">
          <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10"
          ></div>
          <img
            :src="post.thumbnail"
            :alt="post.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-8">
            <div class="max-w-4xl mx-auto">
              <h1
                class="text-3xl sm:text-5xl md:text-6xl font-bold text-green-500 mb-4 glitch-text"
                :data-text="post.title"
              >
                {{ post.title }}
              </h1>
              <div
                class="flex flex-wrap items-center gap-4 text-gray-400 text-sm sm:text-lg"
              >
                <span class="flex items-center gap-2">
                  <i class="bi bi-calendar3 text-green-500"></i>
                  {{ formatDate(post.date) }}
                </span>
                <span class="hidden sm:block">|</span>
                <span class="flex items-center gap-2">
                  <i class="bi bi-folder text-green-500"></i>
                  {{ post.category }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 sm:px-8 max-w-4xl mx-auto">
          <div class="mb-8">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-3 py-1 bg-green-500/10 border border-green-500 text-green-500 rounded-full text-xs sm:text-sm hover:bg-green-500 hover:text-black transition-colors duration-300"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <div
            class="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none mb-16"
            v-html="md.render(post.body)"
          ></div>

          <div class="border-t border-green-500/30 py-8 mb-16">
            <h3 class="text-xl font-bold text-green-500 mb-4">
              Share this post
            </h3>
            <div class="flex flex-wrap gap-4">
              <button
                v-for="platform in sharePlatforms"
                :key="platform.name"
                @click="sharePost(platform.name)"
                class="px-4 py-2 border border-green-500/50 text-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center gap-2"
              >
                <i :class="platform.icon" class="text-lg"></i>
                <span class="hidden sm:inline"
                  >Share on {{ platform.name }}</span
                >
                <span class="sm:hidden">{{ platform.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      <div v-else class="min-h-[60vh] flex items-center justify-center">
        <div class="text-center text-gray-400">
          <div
            class="inline-block border-2 border-t-green-500 border-r-green-500 border-b-transparent border-l-transparent rounded-full w-12 h-12 animate-spin mb-4"
          ></div>
          <p class="text-lg">Loading post...</p>
        </div>
      </div>
    </main>
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import dayjs from "dayjs";
import MarkdownIt from "markdown-it";
import { useHead } from "@vueuse/head";
import { initMatrix } from "@/lib/background";

const md = new MarkdownIt();

const route = useRoute();
const router = useRouter();
const matrix = ref(null);
const post = ref(null);

const sharePlatforms = [
  { name: "Twitter", icon: "bi-twitter" },
  { name: "LinkedIn", icon: "bi-linkedin" },
  { name: "Facebook", icon: "bi-facebook" },
];

const fetchPost = async () => {
  try {
    const response = await fetch(`/api/post/${route.params.slug}`);
    const data = await response.json();
    if (data.error) {
      router.push("/blog");
      return;
    }
    post.value = {
      ...data,
      tags: data.tags || [],
      category: data.category || "Uncategorized",
    };

    const absoluteUrl = window.location.href;
    const absoluteImage = (post.value.thumbnail || "").startsWith("http")
      ? post.value.thumbnail
      : new URL(post.value.thumbnail || "/profile.png", window.location.origin).toString();
    const description = (post.value.excerpt || "Read this amazing blog post.").replace(/\s+/g, " ").trim();

    useHead({
      title: post.value.title,
      link: [{ rel: "canonical", href: absoluteUrl }],
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: post.value.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absoluteUrl },
        { property: "og:image", content: absoluteImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: post.value.title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.value.title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: absoluteImage },
      ],
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    router.push("/blog");
  }
};

const formatDate = (dateString) => {
  return dayjs(dateString).format("MMMM D, YYYY");
};

const sharePost = (platform) => {
  if (!post.value) return;

  const pageUrl = window.location.href;
  const url = encodeURIComponent(pageUrl);
  const title = post.value.title || "";

  let shareMessage = "";
  switch (platform) {
    case "X":
      shareMessage = "Just read this interesting blog post! 🚀";
      break;
    case "LinkedIn":
      shareMessage =
        "Found this blog post really insightful – thought you might like it too.";
      break;
    case "Facebook":
      shareMessage =
        "Came across this blog post and thought it was worth sharing!";
      break;
    default:
      shareMessage = "Check out this interesting blog post I found!";
  }

  const text = encodeURIComponent(shareMessage);
  const hashtagsRaw = (post.value.tags || []).map((t) =>
    String(t).replace(/#/g, "").replace(/\s+/g, ""),
  );
  const hashtags = encodeURIComponent(hashtagsRaw.join(","));

  if (navigator.share) {
    navigator.share({ title, text: shareMessage, url: pageUrl }).catch(() => {
      /* no-op */
    });
    return;
  }

  let shareUrl = "";
  switch (platform) {
    case "X": {
      const hashParam = hashtagsRaw.length ? `&hashtags=${hashtags}` : "";
      shareUrl = `https://x.com/intent/tweet?url=${url}&text=${text}${hashParam}`;
      break;
    }
    case "LinkedIn": {
      const summary = encodeURIComponent(post.value.excerpt || title);
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(title)}&summary=${summary}`;
      break;
    }
    case "Facebook": {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    }
  }

  window.open(shareUrl, "_blank", "noopener,noreferrer");
};

onMounted(() => {
  const cleanup = initMatrix(matrix);
  fetchPost();
  onUnmounted(cleanup);
});
</script>

<style scoped>
.prose {
  color: #a0aec0;
}

.prose p {
  margin-bottom: 1.5em;
}

.glitch-text {
  position: relative;
  text-shadow:
    0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  animation: glitch 500ms infinite;
}

@keyframes glitch {
  0% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow:
      0.05em 0 0 rgba(255, 0, 0, 0.75),
      -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow:
      -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
      0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
      -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow:
      0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
      0.05em 0 0 rgba(0, 255, 0, 0.75),
      0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow:
      -0.025em 0 0 rgba(255, 0, 0, 0.75),
      -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
      -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch-text {
    animation: none;
    text-shadow: none;
  }
}

@media (max-width: 640px) {
  .prose {
    font-size: 0.875rem;
  }
}
</style>
