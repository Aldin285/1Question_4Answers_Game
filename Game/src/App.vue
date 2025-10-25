<script setup>
  import answer from './components/answer.vue';
  import question from './components/question.vue';
  import data from "./data/quiz.json"

  console.log(data);
</script>

<template>
<div class="displayElements">
    <question :question="data[1].question"  :imgURL="data[1].imageURL" />

    <h1>Select one of the following answers: </h1>
    
    <div class="answerSelect">
      <answer :id="1" :answer="data[1].answers[0].answerText" />
      <answer :id="2" :answer="data[1].answers[1].answerText" />
      <answer :id="3" :answer="data[1].answers[2].answerText" />
      <answer :id="4" :answer="data[1].answers[3].answerText" />
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
