<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-8">
      <div class="relative z-10 max-w-6xl mx-auto">
        <div
          class="bg-black/80 border border-green-500/30 rounded-lg p-3 sm:p-4 mb-6 backdrop-blur-sm shadow-lg shadow-green-500/10 sticky top-20 z-20"
        >
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 class="text-xl sm:text-2xl font-bold text-green-500">
              <EncryptingText text="Curriculum Vitae" />
            </h1>
            
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <div class="flex items-center gap-1 sm:gap-2">
                <button
                  @click="zoomOut"
                  :disabled="zoomLevel <= 0.5"
                  class="px-2 sm:px-3 py-1 sm:py-2 text-sm border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="bi bi-zoom-out"></i>
                </button>
                
                <span class="text-green-400 min-w-12 sm:min-w-16 text-center text-sm">
                  {{ Math.round(zoomLevel * 100) }}%
                </span>
                
                <button
                  @click="zoomIn"
                  :disabled="zoomLevel >= 2"
                  class="px-2 sm:px-3 py-1 sm:py-2 text-sm border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="bi bi-zoom-in"></i>
                </button>
                
                <button
                  @click="resetZoom"
                  class="px-2 sm:px-3 py-1 sm:py-2 text-sm border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300"
                >
                  <i class="bi bi-arrow-clockwise"></i>
                </button>
              </div>

              <a
                href="/joaoCoelhoResume.pdf"
                download="JoaoCoelho_CV.pdf"
                class="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-2 text-sm bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                <i class="bi bi-download"></i>
                <span class="hidden sm:inline">Download PDF</span>
                <span class="sm:hidden">PDF</span>
              </a>

              <button
                @click="toggleFullscreen"
                class="px-2 sm:px-3 py-1 sm:py-2 text-sm border border-green-500/30 text-green-500 rounded hover:bg-green-500/10 transition-all duration-300"
              >
                <i :class="isFullscreen ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen'"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isLoading"
          class="flex items-center justify-center h-64 sm:h-96 bg-black/80 border border-green-500/30 rounded-lg backdrop-blur-sm shadow-lg shadow-green-500/10"
        >
          <div class="text-green-500 text-center">
            <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p class="text-sm sm:text-base">Loading CV...</p>
          </div>
        </div>

        <div
          v-else-if="hasError"
          class="flex items-center justify-center h-64 sm:h-96 text-center p-4 sm:p-8 bg-black/80 border border-green-500/30 rounded-lg backdrop-blur-sm shadow-lg shadow-green-500/10"
        >
          <div class="text-green-500">
            <i class="bi bi-exclamation-triangle text-2xl sm:text-4xl mb-4"></i>
            <h3 class="text-lg sm:text-xl font-semibold mb-2">Unable to load CV</h3>
            <p class="text-gray-400 mb-4 text-sm sm:text-base">
              Your browser doesn't support PDF viewing. Please download the file instead.
            </p>
            <a
              href="/joaoCoelhoResume.pdf"
              download="JoaoCoelho_CV.pdf"
              class="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 text-sm sm:text-base"
            >
              <i class="bi bi-download"></i>
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        <div
          v-else-if="!hasError"
          class="pdf-container flex justify-center transition-transform duration-300 ease-in-out"
          :class="{ 'fixed inset-2 sm:inset-4 z-50 bg-black': isFullscreen }"
          :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
        >
          <embed
            :src="pdfUrl"
            type="application/pdf"
            class="border border-green-500/20 rounded shadow-lg w-full max-w-4xl"
            :style="{ height: pdfHeight + 'px' }"
          />
        </div>
      </div>
    </div>

    <CyberFooter v-if="!isFullscreen" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import { useHead } from "@vueuse/head";
import { initMatrix } from "@/lib/background";

useHead({
  title: "João Coelho - CV",
  meta: [
    {
      name: "description",
      content: "View João Coelho's CV.",
    },
  ],
});

const matrix = ref(null);

const zoomLevel = ref(1);
const isFullscreen = ref(false);
const isLoading = ref(true);
const hasError = ref(false);
const windowWidth = ref(0);

const isMobile = computed(() => windowWidth.value < 768);

const pdfUrl = computed(() => {
  return `/joaoCoelhoResume.pdf`;
});

const pdfHeight = computed(() => {
  if (isFullscreen.value) {
    return window.innerHeight - (isMobile.value ? 10 : 20);
  }
  
  if (isMobile.value) {
    return Math.min(600, window.innerHeight * 0.7);
  }
  
  return Math.min(1000, window.innerHeight * 0.9);
});

const zoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value = Math.min(2, zoomLevel.value + 0.1);
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.1);
  }
};

const resetZoom = () => {
  zoomLevel.value = 1;
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

const checkPdfExists = async () => {
  try {
    const response = await fetch('/joaoCoelhoResume.pdf', { method: 'HEAD' });
    if (response.ok) {
      isLoading.value = false;
      hasError.value = false;
    } else {
      throw new Error('PDF not found');
    }
  } catch (error) {
    console.error('Error loading PDF:', error);
    isLoading.value = false;
    hasError.value = true;
  }
};

const handleKeyDown = (event) => {
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case '=':
      case '+':
        event.preventDefault();
        zoomIn();
        break;
      case '-':
        event.preventDefault();
        zoomOut();
        break;
      case '0':
        event.preventDefault();
        resetZoom();
        break;
    }
  }
  
  if (event.key === 'F11') {
    event.preventDefault();
    toggleFullscreen();
  }
  
  if (event.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false;
  }
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  const cleanup = initMatrix(matrix);
  
  updateWindowWidth();
  
  checkPdfExists();
  
  window.addEventListener("keydown", handleKeyDown);
  
  const handleResize = () => {
    updateWindowWidth();
    if (matrix.value) {
      matrix.value.width = window.innerWidth;
      matrix.value.height = window.innerHeight;
    }
  };
  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    cleanup();
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped>
.pdf-container {
  position: relative;
}

@media (max-width: 767px) {
  .pdf-container embed {
    height: 600px !important;
    max-height: 70vh !important;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .pdf-container embed {
    height: 800px !important;
    max-height: 80vh !important;
  }
}

@media (min-width: 1024px) {
  .pdf-container embed {
    min-height: 900px !important;
    max-height: 90vh !important;
  }
}

.pdf-container.fixed embed {
  height: calc(100vh - 20px) !important;
  max-height: none !important;
}

@media (max-width: 767px) {
  .pdf-container.fixed embed {
    height: calc(100vh - 10px) !important;
  }
}
</style>