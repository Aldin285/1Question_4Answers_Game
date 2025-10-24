<script setup>

defineProps({
    id:{
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="answer">
        <h2 id="{{ id }}">{{ answer }}</h2>
    </div>
</template>

<style scoped>
    .answer {
        padding: 10px;
        margin: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 20em;
        height: 7em;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>