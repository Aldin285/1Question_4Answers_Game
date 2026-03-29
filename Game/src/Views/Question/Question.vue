<script setup>

defineProps({
    question:{
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        default: `${import.meta.env.BASE_URL}images/questionMark.webp`
        
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
   @import url("./Question.css");
</style>