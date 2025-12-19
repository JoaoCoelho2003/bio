<template>
  <div class="min-h-screen bg-black pt-16">
    <CyberHeader />

    <canvas ref="matrix" class="fixed inset-0 opacity-10"></canvas>

    <div class="container mx-auto px-4 py-12">
      <div class="relative z-10 max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1
            class="text-4xl font-bold text-green-500 mb-4"
            data-text="Establish Connection"
          >
            <EncryptingText text="Establish Connection" />
          </h1>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Ready to collaborate or have a question? Use this secure channel to
            get in touch.
          </p>
        </div>

        <div class="bg-black/80 border border-green-500/30 rounded-lg p-8">
          <form @submit.prevent="submitForm" class="space-y-6">
            <input
              type="text"
              name="bot-check"
              v-model="formData.botCheck"
              style="position: absolute; left: -9999px; opacity: 0;"
              tabindex="-1"
              autocomplete="off"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="name" class="block text-green-500"
                  >Identifier</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  maxlength="100"
                  :class="getFieldClass('name')"
                  placeholder="Enter your name"
                />
                <div v-if="fieldErrors.name" class="text-red-400 text-sm flex items-center gap-2">
                  <i class="bi bi-exclamation-triangle"></i>
                  {{ fieldErrors.name }}
                </div>
              </div>
              <div class="space-y-2">
                <label for="email" class="block text-green-500"
                  >Communication Protocol</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  maxlength="254"
                  :class="getFieldClass('email')"
                  placeholder="Enter your email"
                />
                <div v-if="fieldErrors.email" class="text-red-400 text-sm flex items-center gap-2">
                  <i class="bi bi-exclamation-triangle"></i>
                  {{ fieldErrors.email }}
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <label for="message" class="block text-green-500"
                >Transmission Content</label
              >
              <textarea
                id="message"
                v-model="formData.message"
                rows="6"
                required
                maxlength="1000"
                :class="getFieldClass('message')"
                placeholder="Your message here..."
              ></textarea>
              <div class="flex justify-between items-center">
                <div v-if="fieldErrors.message" class="text-red-400 text-sm flex items-center gap-2">
                  <i class="bi bi-exclamation-triangle"></i>
                  {{ fieldErrors.message }}
                </div>
                <div class="text-right text-xs text-gray-500">
                  {{ formData.message.length }}/1000
                </div>
              </div>
            </div>
            
            <div v-if="showRateLimitWarning" class="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 flex items-start gap-3">
              <i class="bi bi-clock text-yellow-400 text-lg mt-0.5"></i>
              <div>
                <div class="text-yellow-400 font-semibold">Rate Limit Active</div>
                <div class="text-yellow-300 text-sm">{{ rateLimitMessage }}</div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-black rounded hover:bg-green-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="mr-2">{{ getSubmitButtonText() }}</span>
                <i
                  :class="getSubmitIconClass()"
                ></i>
              </button>
            </div>
          </form>
        </div>

        <div v-if="message.text" 
             class="mt-6 rounded-lg border-2 p-4 flex items-start gap-3 transform transition-all duration-500"
             :class="getMessageClass()">
          <i :class="getMessageIcon()" class="text-lg mt-0.5"></i>
          <div>
            <div class="font-semibold mb-1">{{ getMessageTitle() }}</div>
            <div class="text-sm opacity-90">{{ message.text }}</div>
          </div>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <i class="bi bi-geo-alt text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">Location</h3>
            <p class="text-gray-400">Braga, Portugal</p>
          </div>
          <div
            class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <i class="bi bi-envelope text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">Email</h3>
            <a
              href="mailto:me@joaocoelho.dev"
              class="text-gray-400 hover:text-green-500 transition-colors"
              >me@joaocoelho.dev</a
            >
          </div>
          <div
            class="bg-black/80 border border-green-500/30 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
          >
            <i class="bi bi-linkedin text-4xl text-green-500 mb-4"></i>
            <h3 class="text-xl font-semibold text-green-400 mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/joaocoelho03/"
              target="_blank"
              class="text-gray-400 hover:text-green-500 transition-colors"
              >joaocoelho03</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <CyberFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import emailjs from "emailjs-com";
import CyberHeader from "@/components/CyberHeader.vue";
import CyberFooter from "@/components/CyberFooter.vue";
import EncryptingText from "@/components/EncryptingText.vue";
import { useHead } from "@vueuse/head";
import { initMatrix } from "@/lib/background";

useHead({
  title: "Contact - João Coelho",
  link: [{ rel: "canonical", href: "https://joaocoelho.dev/contact" }],
  meta: [
    {
      name: "description",
      content:
        "Get in touch with João Coelho for collaboration, job opportunities, or tech discussions.",
    },
    { property: "og:title", content: "Contact - João Coelho" },
    { property: "og:description", content: "Get in touch with João Coelho for collaboration, job opportunities, or tech discussions." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://joaocoelho.dev/contact" },
    { property: "og:image", content: "https://joaocoelho.dev/profile.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact - João Coelho" },
    { name: "twitter:description", content: "Get in touch with João Coelho for collaboration or tech discussions." },
    { name: "twitter:image", content: "https://joaocoelho.dev/profile.png" },
  ],
});

const matrix = ref(null);
const isSubmitting = ref(false);
const message = ref({ text: '', type: '' });
const fieldErrors = ref({});
const showRateLimitWarning = ref(false);

const formData = ref({
  name: "",
  email: "",
  message: "",
  botCheck: "",
});

const lastSubmissionTime = ref(0);
const RATE_LIMIT_MS = 30000;

const hasRateLimit = computed(() => {
  const now = Date.now();
  return now - lastSubmissionTime.value < RATE_LIMIT_MS;
});

const rateLimitMessage = computed(() => {
  if (!hasRateLimit.value) return '';
  const now = Date.now();
  const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmissionTime.value)) / 1000);
  return `Please wait ${remainingTime} seconds before submitting again.`;
});

const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'name':
      if (!value?.trim()) return 'Identifier is required';
      if (value.length > 100) return 'Identifier must be less than 100 characters';
      break;
    case 'email':
      if (!value?.trim()) return 'Communication protocol is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Invalid communication protocol format';
      break;
    case 'message':
      if (!value?.trim()) return 'Transmission content is required';
      if (value.length > 1000) return 'Transmission content must be less than 1000 characters';
      break;
  }
  return null;
};

const validateForm = () => {
  fieldErrors.value = {};
  
  if (formData.value.botCheck) {
    return { isValid: false, error: "Unauthorized access detected." };
  }

  const nameError = validateField('name', formData.value.name);
  const emailError = validateField('email', formData.value.email);
  const messageError = validateField('message', formData.value.message);

  if (nameError) fieldErrors.value.name = nameError;
  if (emailError) fieldErrors.value.email = emailError;
  if (messageError) fieldErrors.value.message = messageError;

  const hasErrors = Object.keys(fieldErrors.value).length > 0;
  
  if (hasErrors) {
    return { isValid: false, error: "Please correct the highlighted fields." };
  }

  return { isValid: true };
};

const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

const getFieldClass = (fieldName) => {
  const baseClass = "w-full bg-black/50 border rounded px-4 py-2 text-green-500 focus:outline-none transition-colors duration-300";
  const errorClass = "border-red-500/50 focus:border-red-500";
  const normalClass = "border-green-500/30 focus:border-green-500";
  
  return `${baseClass} ${fieldErrors.value[fieldName] ? errorClass : normalClass}`;
};

const getMessageClass = () => {
  if (message.value.type === 'success') {
    return 'bg-green-900/30 border-green-500/50 text-green-400';
  } else if (message.value.type === 'error') {
    return 'bg-red-900/30 border-red-500/50 text-red-400';
  }
  return '';
};

const getMessageIcon = () => {
  if (message.value.type === 'success') {
    return 'bi bi-check-circle text-green-400';
  } else if (message.value.type === 'error') {
    return 'bi bi-x-circle text-red-400';
  }
  return '';
};

const getMessageTitle = () => {
  if (message.value.type === 'success') {
    return 'Transmission Successful';
  } else if (message.value.type === 'error') {
    return 'Transmission Failed';
  }
  return '';
};

const getSubmitButtonText = () => {
  if (isSubmitting.value) return 'Transmitting...';
  return 'Transmit';
};

const getSubmitIconClass = () => {
  const baseClass = "transition-transform group-hover:translate-x-1";
  if (isSubmitting.value) return `bi bi-arrow-repeat animate-spin ${baseClass}`;
  return `bi bi-arrow-right ${baseClass}`;
};

const submitForm = async () => {
  message.value = { text: '', type: '' };
  showRateLimitWarning.value = false;
  
  if (hasRateLimit.value) {
    showRateLimitWarning.value = true;
    return;
  }
  
  const validation = validateForm();
  if (!validation.isValid) {
    message.value = { text: validation.error, type: 'error' };
    return;
  }

  isSubmitting.value = true;

  try {
    const templateParams = {
      from_name: sanitizeInput(formData.value.name).substring(0, 100),
      from_email: formData.value.email.trim().toLowerCase(),
      message: sanitizeInput(formData.value.message).substring(0, 1000),
      reply_to: formData.value.email.trim().toLowerCase(),
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    if (response.status === 200) {
      formData.value.name = "";
      formData.value.email = "";
      formData.value.message = "";
      formData.value.botCheck = "";
      fieldErrors.value = {};
      
      lastSubmissionTime.value = Date.now();
      
      message.value = { 
        text: "Connection established successfully! Awaiting your next transmission.", 
        type: 'success' 
      };
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Error:", error);
    message.value = { 
      text: "Network error encountered. Please retry transmission or use alternative communication channels.", 
      type: 'error' 
    };
  } finally {
    isSubmitting.value = false;
  }
};

watch([() => formData.value.name, () => formData.value.email, () => formData.value.message], 
  ([name, email, message]) => {
    if (showRateLimitWarning.value) {
      showRateLimitWarning.value = false;
    }
    
    if (fieldErrors.value.name && name?.trim()) {
      const error = validateField('name', name);
      if (!error) delete fieldErrors.value.name;
    }
    if (fieldErrors.value.email && email?.trim()) {
      const error = validateField('email', email);
      if (!error) delete fieldErrors.value.email;
    }
    if (fieldErrors.value.message && message?.trim()) {
      const error = validateField('message', message);
      if (!error) delete fieldErrors.value.message;
    }
  }
);

onMounted(() => {
  const cleanup = initMatrix(matrix);
  onUnmounted(cleanup);
});
</script>