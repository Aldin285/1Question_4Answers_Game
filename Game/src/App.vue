<script setup>
  import answer from './components/answer.vue';
  import question from './components/question.vue';
</script>

<template>
<div class="displayElements">
    <question :question="'What is the main character\'s name?'"  imgURL="/images/shaw.webp" />

    <h1>Select one of the following answers: </h1>
    
    <div class="answerSelect">
      <answer id="1" answer="This is the first answer." />
      <answer id="2" answer="This is the second answer." />
      <answer id="3" answer="This is the third answer." />
      <answer id="4" answer="This is the fourth answer." />
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
