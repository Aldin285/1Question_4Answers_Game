<script setup>
  import answer from './components/answer.vue';
  import question from './components/question.vue';
  import data from "./data/quiz.json"
  import { useTimer, useStopwatch } from 'vue-timer-hook';

  import { ref, onMounted,watchEffect, computed } from 'vue';

  const selectedAnswer = ref(null);
  const currentQuestionIndex = ref(1);

  function CheckAnswer(e) {
    selectedAnswer.value = e.target.id;
    if(data[currentQuestionIndex.value].answerId== selectedAnswer.value){
      console.log("You picked the right answer")
    }else{
      console.log("You picked the wrong answer bug")
    }
  }

  // Chrono
  const timeLimit = 10;
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeLimit);

  const chrono = useTimer(time)

  onMounted(() => {
  watchEffect(async () => {
    if(chrono.isExpired.value) {
        console.log('The timer has expired')
    }
  })
})
  const totalLength = 2 * Math.PI * 45;
  const timeFraction = computed(() => chrono.seconds.value / timeLimit);

  const elapsedDash = computed(() => Math.floor(timeFraction.value * totalLength))

 
</script>

<template>
  <!-- Chrono -->
<div class="displayElements">
  <h1>Chrono : </h1>
   <div class="container">
    <svg class="svg" viewBox="0 0 100 100">
      <g class="circle">
        <circle class="time-elapsed-path" cx="50" cy="50" r="45" />

         <path
          class="time-left-path"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
          :style="{  strokeDasharray: `${elapsedDash} ${totalLength}` }"
        ></path>

      </g>
    </svg>

    <div class="time-left-container">
      <span>{{ chrono.seconds }}</span>
    </div>
  </div>


  <!--Question -->
    <question :question="data[currentQuestionIndex].question"  :imgURL="data[currentQuestionIndex].imageURL" />

    <h1>Select one of the following answers: </h1>
    
  <!-- Selection des réponses -->
    <div class="answerSelect">

       <div v-for="answer in data[currentQuestionIndex].answers" :key="answer.id">
         <answer :id="answer.id" :answer="answer.answerText" @click="CheckAnswer"/>
      </div>
      
    </div>

</div>
</template>

<style scoped>
  .answerSelect{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 5em;
    padding-right:10em;
    padding-left:10em;
  }

  .grow{
    flex-grow: 2;
  }
  .displayElements{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Chrono */
  .container {
  height: 150px;
  width: 150px;
  position: relative;
}

.circle {
  fill: none;
  stroke: none;
}

.time-elapsed-path {
  stroke-width: 7px;
  stroke: #424242;
}

.time-left-container {
  /* Size should be the same as that of parent container */
  height: inherit;
  width: inherit;

  /* Place container on top of circle ring */
  position: absolute;
  inset: 0;

  /* Center content (label) vertically and horizontally  */
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 70px;
  color: white;
}

.time-left-path {
  /* Same thickness as the original ring */
  stroke-width: 7px;
  /* Colors the ring */
  stroke: rgb(255, 0, 0);
  /* Rounds the path endings  */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  /* transition: 1s linear all; */
  transition: stroke-dasharray 1s linear, stroke 0.3s ease;;

  
}

.svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}
</style>
