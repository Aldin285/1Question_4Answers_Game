<script setup>

defineProps({
    question:{
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        default: '/images/questionMark.webp'
        
    }
});

</script>

<template>
    <div class="question">
        <img  :src="imgURL" />
        <h2>{{ question }}</h2>
    </div>
    
</template>

<style scoped>
    .question {
        padding: 10px;
        margin: 5px;
        border: 1px solid #6ce9f2;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: auto;
        height: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        max-width: 35em;
        max-height: 20em;
        margin-bottom: 1em;
        border-radius: 3%;
    }
</style>