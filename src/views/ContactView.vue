<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold mb-8 text-green-400">Get In Touch</h1>
    <div class="max-w-md w-full">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-400">Name</label>
          <input type="text" id="name" v-model="formData.name" required
            class="mt-1 block w-full rounded-md bg-gray-900 border-green-500 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-400">Email</label>
          <input type="email" id="email" v-model="formData.email" required
            class="mt-1 block w-full rounded-md bg-gray-900 border-green-500 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50">
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-400">Message</label>
          <textarea id="message" v-model="formData.message" rows="4" required
            class="mt-1 block w-full rounded-md bg-gray-900 border-green-500 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"></textarea>
        </div>
        <div>
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import emailjs from 'emailjs-com';
import AppLayout from '@/components/AppLayout.vue';

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
