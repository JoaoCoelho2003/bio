<template>
  <div class="relative">
    <svg viewBox="0 0 500 200" class="absolute inset-0 z-0">
      <path
        d="M 0,100 C 150,200 350,0 500,100 L 500,00 L 0,0 Z"
        fill="#051f46"
      ></path>
    </svg>

    <div id="app" class="bg-[#021d44] min-h-screen flex flex-col items-center justify-center z-10">
      <div class="absolute top-0 text-center p-10 space-y-8 md:space-y-24">
        <div class="flex justify-center text-white font-bold text-4xl lg:text-8xl">
          <span class="underline-custom">Get In Touch</span>
        </div>
        <div class="text-white/90 text-lg lg:text-2xl font-light">
          <p>Whether you have a question or just want to say hello, my inbox is always open. I'll try my best to get back to you!</p>
        </div>
      </div>
      <div class="flex justify-center items-center w-full z-10 px-4 md:px-20">
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <div>
            <label for="name" class="block text-md font-light text-white">Name</label>
            <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" required
              class="mt-1 block w-full border-[#d62f6a] border-2 rounded-md shadow-sm focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-3 text-white">
          </div>
          <div>
            <label for="email" class="block text-md font-light text-white">Email</label>
            <input type="email" id="email" v-model="formData.email" placeholder="email@example.com" required
              class="mt-1 block w-full border-[#d62f6a] border-2 rounded-md shadow-sm focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-3 text-white">
          </div>
          <div class="md:col-span-2">
            <label for="message" class="block text-md font-light text-white">Message</label>
            <textarea id="message" v-model="formData.message" rows="6" placeholder="Write your Message" required
              class="mt-1 block w-full rounded-md shadow-sm border-[#d62f6a] border-2 focus:ring-[#b81d50] bg-[#021d44] focus:ring-opacity-50 p-2 text-white"></textarea>
          </div>
          <div class="flex justify-end md:col-span-2 mt-2">
            <button type="submit" class="w-1/4 h-12 bg-[#d62f6a] text-white rounded-md hover:bg-[#b81d50] focus:outline-none focus:bg-[#b81d50]">
              Send
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
