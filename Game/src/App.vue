<script setup>
  import Footer from './Views/Footer/Footer.vue';
import GameDisplay from './Views/GameDisplay/GameDisplay.vue';
  import data from "./data/quiz.json"

  import { ref, onMounted, watchEffect, reactive } from 'vue';

  // Affichage
  const getStarted = ref(true);
  const displayElements = ref(false);
  const displayEndScreen = ref(false);

  const baseUrl = import.meta.env.BASE_URL;
  const resolveImagePath = (path = '') => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${baseUrl}${path.replace(/^\/+/, '')}`;
  };

  // Organisation des questions
  // Générer un nombre aléa 
   function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // Liste des questions et la limate
  let selectedQuestions = reactive([]);
  const questionLimits = 5;

  // Sélection des questions
  function selectQuestions() {
    selectedQuestions = reactive([]);
    for(; selectedQuestions.length<=questionLimits-1;){
      const randInt = getRandomInt(data.length);
      if(!selectedQuestions.includes(randInt)){
        selectedQuestions.push(randInt);
      }
    }
    //  console.log("Selected Questions : ", selectedQuestions);
  }
  selectQuestions();
 
  // Index de la question courante
  const currentQuestionIndex = ref(selectedQuestions[questionLimits-1]);

  // Id de la bonne réponse pour la question actuelle
  const answerId = ref(data[currentQuestionIndex.value].answerId)

  // Score
  const totalScore = ref(0);

  // Fonction pour passer à la question suivante et afficher le score final
  function NextQuestion() {
    if(selectedQuestions.indexOf(currentQuestionIndex.value) > 0){
      currentQuestionIndex.value = selectedQuestions[selectedQuestions.indexOf(currentQuestionIndex.value)-1];
      answerId.value = data[currentQuestionIndex.value].answerId;
    }else{
      displayElements.value = false;
      displayEndScreen.value = true;
      console.log("Quiz finished")
    }
  }

  // Reset game
  function ResetGame(){
    getStarted.value = true;
    displayEndScreen.value = false;

    selectQuestions();

    currentQuestionIndex.value = selectedQuestions[questionLimits-1];
    answerId.value = data[currentQuestionIndex.value].answerId;

    totalScore.value = 0;
  }
  
  
  onMounted(() => {
    watchEffect(async () => {
      selectQuestions();
    })
  });

  // Handle events from GameDisplay
  function handleCheckAnswer(answerData) {
    // Update score based on answer correctness
    if (answerData.isCorrect) {
      console.log("Correct answer!");
    } else {
      console.log("Wrong answer!");
    }
  }

  function handleNextQuestion() {
    NextQuestion();
  }

  function handleTimeOut() {
    console.log("Time's out from GameDisplay");
  }
 
 
</script>

<template>
  <div class="screen-root">

    <!-- Ecran de jeu -->
    <transition name="fade" mode="out-in">
      <div v-if="displayElements" key="display">
        <GameDisplay 
          :currentQuestion="data[currentQuestionIndex]"
          :answerId="answerId"
          :resolveImagePath="resolveImagePath"
          @checkAnswer="handleCheckAnswer"
          @nextQuestion="handleNextQuestion"
          @timeOut="handleTimeOut"
        />
      </div>
    </transition>

    <!-- Ecran démarrage -->
    <transition name="fade" mode="out-in">
      <div v-if="getStarted" class="getStarted" key="start">
        <h1>Welcome to the Quiz Game!</h1>
        <button @click="{displayElements = true;getStarted=false}"  class="button-82-pushable">
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text">
          Get Started
        </span>
        </button>
      </div>
    </transition>

    <!-- Ecran fin de la partie -->
    <transition name="fade" mode="out-in">
      <div v-if="displayEndScreen" class="getStarted" key="end">
        <h1>Your final score is :</h1>
        <h1> {{ totalScore }}</h1>
        <button @click="ResetGame"  class="button-82-pushable">
        <span class="button-82-shadow"></span>
        <span class="button-82-edge"></span>
        <span class="button-82-front text">
          Play again
        </span>
        </button>
      </div>
    </transition>

     <!-- Footer -->
    <Footer />

  </div>
</template>

<style scoped>
 
@import url("./global.css");

</style>
