<script setup>
import { onMounted,watchEffect, computed, ref } from 'vue';

const props = defineProps({
    dashLeft:{
        type: Number,
        required: true
    },
    totalDash:{
        type: Number,
        required: true
    },
    check:{
        type: Boolean,
        default: false
    }
});

// J'ai décidé de calculer le score par rapport à la barre de temps restante au lieu du temps restant
// car je ne pouvais pas avoir le temps en milliseconds. Cette méthode me permet d'avoir un score plus précis.

const currentScore = ref(0);
const totalScore = ref(0);

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
     </div>
</div>
</template>

<style scoped>

.score-root {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 998; 
  pointer-events: none; 
}

.container {
  height: auto;
  width: auto;
  position: relative;

  /* From https://css.glass */
  background: rgba(51, 43, 43, 0.35);
  border-radius: 5px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

</style>