<script setup>
  import answer from './components/Answer.vue';
  import question from './components/Question.vue';
  import timer from './components/timer.vue';
  import data from "./data/quiz.json"

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
 
</script>

<template>
  <!-- Chrono -->
<div class="displayElements">

  <!-- Timer -->
  <timer :timeLimit="4"/>

  <!--Question -->
    <question :question="data[currentQuestionIndex].question"  :imgURL="data[currentQuestionIndex].imageURL" />
    
  <!-- Selection des réponses -->
    <h1>Select one of the following answers: </h1>
    
    <div class="answerSelect">

       <div v-for="answer in data[currentQuestionIndex].answers" :key="answer.id" >
         <answer   :id="answer.id" :answer="answer.answerText" @click="CheckAnswer"/>
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

</style>
