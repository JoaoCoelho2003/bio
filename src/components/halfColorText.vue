<template>
    <div class="half-color-text">
        <span :style="{ color: color1 }">{{ text1 }}</span>
        <span :style="{ color: color2 }">{{ text2 }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    color1: {
        type: String,
        required: true
    },
    color2: {
        type: String,
        required: true
    },
    text1: {
        type: String,
        required: true
    },
    text2: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.half-color-text {
    display: inline-block;
    font-weight: bold;
    text-align: center;
}
</style>
