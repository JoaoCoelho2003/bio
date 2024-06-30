<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col lg:flex-row items-center justify-center z-10">
      <div class="absolute top-0 left-0 p-10 lg:p-40 lg:w-2/3">
        <div class="text-white font-bold text-4xl lg:text-8xl">
          <span class="underline-custom">Contact Me</span>
        </div>
      </div>
      <div class="flex justify-center items-center z-10 mt-64">
        <form @submit.prevent="submitForm" class="grid grid-rows-3 gap-4 mt-8 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
            <div>
              <label for="name" class="block text-md font-medium text-white "></label>
              <input type="text" id="name" v-model="formData.name" placeholder="Your Name" required
                class="mt-1 block w-full border-[#d62f6a] border-2 rounded-md shadow-sm focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-3 text-white">
            </div>
            <div>
              <label for="email" class="block text-md font-medium text-white"></label>
              <input type="email" id="email" v-model="formData.email" placeholder="Your Email" required
                class="mt-1 block w-full border-[#d62f6a] border-2 rounded-md shadow-sm focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-3 text-white">
            </div>
          </div>

          <div>
            <label for="message" class="block text-md font-medium text-gray-700"></label>
            <textarea id="message" v-model="formData.message" rows="6" placeholder="Your Message" required
              class="mt-1 block w-full rounded-md shadow-sm border-[#d62f6a] border-2 focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-2 text-white"></textarea>
          </div>

          <div class="flex justify-center">
            <button type="submit" class="w-1/2 h-1/4 bg-[#d62f6a] text-white rounded-md hover:bg-[#b81d50] focus:outline-none focus:bg-[#b81d50]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

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
</script>

<style scoped>
.underline-custom {
  border-bottom: 3px solid #d62f6a;
}
</style>
