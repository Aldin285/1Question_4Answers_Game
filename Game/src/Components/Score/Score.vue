<script setup>
import { onMounted,watchEffect, computed, ref } from 'vue';

const props = defineProps({
    // The time left for the current question, in milliseconds
    dashLeft:{
        type: Number,
        required: true
    },
    // The total time for the question, in milliseconds
    totalDash:{
        type: Number,
        required: true
    },
    // Changes based on the answer
    check:{
        type: Boolean,
        default: false
    }
});

// J'ai décidé de calculer le score par rapport à la barre de temps restante au lieu du temps restant
// car je ne pouvais pas avoir le temps en milliseconds. Cette méthode me permet d'avoir un score plus précis.

const currentScore = ref(0);
const totalScore = ref(0);

const highestScore = ref(JSON.parse(localStorage.getItem("totalScore") ?? false));

function calculateScore(){
    // Simple calculation based on time left
    currentScore.value = Math.round((props.dashLeft / props.totalDash) * 100);
    totalScore.value += currentScore.value;

    currentScore.value = 0;
}

// Emit
const emit = defineEmits(['finalScore']);

onMounted(() => {
  watchEffect(async () => {
    if (props.check){
        calculateScore();
    }
    emit('finalScore', totalScore.value);
  })
});

</script>

<template>
<div class="score-root">
    <div class="container">
        
        <p>Total score : {{ totalScore }}</p>
        <p v-if="highestScore">Highest score : {{ highestScore }}</p>
     </div>
</div>
</template>

<style scoped>
@import url("./Score.css");

</style>