<script setup>
  import answer from './components/Answer.vue';
  import question from './components/Question.vue';
  import timer from './components/Timer.vue';
  import data from "./data/quiz.json"

  import { ref, onMounted,watchEffect, computed, reactive } from 'vue';

  // Pour la réponse sélectionnée
  const selectedAnswer = ref(null);

  // Organisation des questions

  // Générer un nombre aléa 
   function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // Liste des questions et la limate
  const selectedQuestions = reactive([]);
  const questionLimits = 3;

  // Sélection des questions
  for(; selectedQuestions.length<=questionLimits-1;){
    const randInt = getRandomInt(data.length);
    if(!selectedQuestions.includes(randInt)){
      selectedQuestions.push(randInt);
    }
  }
  console.log("Selected Questions : ", selectedQuestions);
  // Index de la question courante
  const currentQuestionIndex = ref(selectedQuestions[questionLimits-1]);

  // Id de la bonne réponse pour la question actuelle
  const answerId = ref(data[currentQuestionIndex.value].answerId)

  // Pour les réponses
  const rightAnswerStyle = ref({});
  const wrongAnswerStyle = ref({});
  const disableButtons = ref(false);

  // Chrono
  const timeLeft = ref();
  const stopTimer = ref(false);
  const restartTimer = ref(false);

  function CheckAnswer(e) {
    // Récupère l'id de la réponse sélectionnée
    selectedAnswer.value = e.target.id;

    // Changement de style par rapport à la réponse sélectionnée
    if(answerId.value == selectedAnswer.value){
      console.log("You picked the right answer")

      rightAnswerStyle.value = {
        border: '2px solid green',
        backgroundColor: 'lightgreen',
        cursor: 'not-allowed',
      };

      wrongAnswerStyle.value = {
        cursor: 'not-allowed',
      };
    }else{
      console.log("You picked the wrong answer bug")

      rightAnswerStyle.value = {
        border: '2px solid green',
        backgroundColor: 'lightgreen',
        cursor: 'not-allowed',
      };
      
      wrongAnswerStyle.value = {
        border: '2px solid red',
        backgroundColor: '#ff7f7f',
         cursor: 'not-allowed',
      };
    }

     // Désactive les boutons après une sélection
    disableButtons.value = true;
    // Arrête le chrono après une sélection
    stopTimer.value = true;

    // Changer la question
    setTimeout(() => {
      if(selectedQuestions.indexOf(currentQuestionIndex.value) >0){
        currentQuestionIndex.value = selectedQuestions[selectedQuestions.indexOf(currentQuestionIndex.value)-1];
        answerId.value = data[currentQuestionIndex.value].answerId;

        // Réinitialise les styles et les variables
        rightAnswerStyle.value = {};
        wrongAnswerStyle.value = {};
        disableButtons.value = false;
        selectedAnswer.value = null;
        stopTimer.value = false;
        restartTimer.value = true;
        setTimeout(() => {
          restartTimer.value = false;
        }, 100);
    
      }else{
        console.log("Quiz finished")
      }
    }, 3000);
    
  }

  // Annule la séléction de réponse quand le temps est écoulé
  function TimeOut (){
    if (timeLeft.value==0){
      console.log("Time's out")

      rightAnswerStyle.value = {
        border: '2px solid green',
        backgroundColor: 'lightgreen',
        cursor: 'not-allowed',
      };
      
      wrongAnswerStyle.value = {
        border: '2px solid red',
        backgroundColor: '#ff7f7f',
         cursor: 'not-allowed',
      };

      disableButtons.value = true;

      // Changer la question
    setTimeout(() => {
      if(selectedQuestions.indexOf(currentQuestionIndex.value) >0){
        currentQuestionIndex.value = selectedQuestions[selectedQuestions.indexOf(currentQuestionIndex.value)-1];
        answerId.value = data[currentQuestionIndex.value].answerId;

        // Réinitialise les styles et les variables
        rightAnswerStyle.value = {};
        wrongAnswerStyle.value = {};
        disableButtons.value = false;
        selectedAnswer.value = null;
        stopTimer.value = false;
        restartTimer.value = true;
        setTimeout(() => {
          restartTimer.value = false;
        }, 100);
    
      }else{
        console.log("Quiz finished")
      }
    }, 3000);
    }
  }

  
  
  onMounted(() => {
    watchEffect(async () => {
      TimeOut();
    })
  });
 
</script>

<template>
  <div class="displayElements">

  <!-- Timer -->
  <timer :timeLimit="2" :stop="stopTimer" :restart="restartTimer" @timeLeft='(tl) => timeLeft = tl' />

  <!--Question -->
    <question :question="data[currentQuestionIndex].question"  :imgURL="data[currentQuestionIndex].imageURL" />
  
  <!-- Selection des réponses -->
    <h1>Select one of the following answers: </h1>
    
    <div class="answerSelect">

       <div v-for="answer in data[currentQuestionIndex].answers" :key="answer.id" >
         <answer   :id="answer.id" :answer="answer.answerText" :style="answerId === answer.id ? rightAnswerStyle : wrongAnswerStyle"  @click="CheckAnswer" :disabled="disableButtons"/>
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
