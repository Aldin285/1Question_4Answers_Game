<script setup>
import Button from '@/Components/Button/Button.vue'; 

const props = defineProps({
    totalScore: { 
        type: Number,
        required: true
    }
});

// Handle the click event 
const emit = defineEmits(['click']);

function handleClick(event) {
	emit('click', event);
}


</script>

<template>


    <h1>Your final score is :</h1>
    <h1> {{ props.totalScore }}</h1>
    
    <Button
        text="Play again"
        @click="handleClick"
    />


</template>
