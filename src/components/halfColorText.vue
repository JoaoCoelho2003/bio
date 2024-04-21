<template>
    <div class="half-color-text">
        <span :style="{ fontSize: fontSize, color: color1 }">{{ text1 }}</span>
        <span :style="{ fontSize: fontSize, color: color2 }">{{ text2 }}</span>
    </div>
</template>

<script>
export default {
    props: {
        fontSize: {
            type: String,
            required: true
        },
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
    }
}
</script>

<style scoped>
.half-color-text {
    display: inline-block;
    font-weight: bold;
}
</style>