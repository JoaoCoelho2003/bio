<template>
    <span ref="textElement">{{ displayText }}</span>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    text: {
      type: String,
      required: true
    }
  });
  
  const displayText = ref('');
  const textElement = ref(null);
  
  const encryptChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  const animateText = async () => {
    const finalText = props.text;
    let currentText = '';
  
    for (let i = 0; i < finalText.length; i++) {
      for (let j = 0; j < 5; j++) {
        currentText = finalText.substring(0, i) + 
                      encryptChars[Math.floor(Math.random() * encryptChars.length)] + 
                      finalText.substring(i + 1);
        displayText.value = currentText;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      currentText = finalText.substring(0, i + 1) + finalText.substring(i + 1);
      displayText.value = currentText;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
  
  onMounted(() => {
    animateText();
  });
  
  watch(() => props.text, () => {
    animateText();
  });
  </script>