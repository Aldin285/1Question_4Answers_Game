<script setup>

defineProps({
    id:{
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    style: {
        type: Object,
        default: () => ({})
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

</script>

<template>
<div>
    <button type="button" :id="id" :style="style" :disabled="disabled">{{ answer }}</button>
</div>
</template>

<style scoped>
    button {
        padding: 5px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 15em;
        height: 4em;
        background-color: transparent;
        color: white;
        font-size: 150%;
        font-weight: bold;

        display: flex;
        justify-content: center;
        align-items: center;

        overflow-wrap: break-word;
    }
</style>