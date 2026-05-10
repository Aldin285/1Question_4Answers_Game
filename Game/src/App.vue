<script setup>
  import Footer from '@/Views/Footer/Footer.vue';
  import GameDisplay from '@/Views/GameDisplay/GameDisplay.vue';
  import Button from '@/Components/Button/Button.vue';
  import data from "./data/quiz.json"

  import { ref, computed, reactive } from 'vue';
  import Restart from '@/Views/Restart/Restart.vue';
import PieComponent from './Components/PieComponent/PieComponent.vue';

  // Affichage
  const getStarted = ref(true);
  const displayElements = ref(false);
  const displayEndScreen = ref(false);

  // Fonction pour résoudre le chemin de l'image
  const baseUrl = import.meta.env.BASE_URL;
  const resolveImagePath = (path = '') => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${baseUrl}${path.replace(/^\/+/, '')}`;
  };

  // Organisation des questions
  // Générer un nombre aléatoire
   function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  // Liste des questions et la limite de questions à afficher
  let selectedQuestions = reactive([]);
  const questionLimits = 10;

  // Sélection des questions
  function selectQuestions() {
    selectedQuestions.length = 0; // Clear array while maintaining reactivity
    while(selectedQuestions.length < questionLimits){
      const randInt = getRandomInt(data.length);
      if(!selectedQuestions.includes(randInt)){
        selectedQuestions.push(randInt);
      }
    }
    //  console.log("Selected Questions : ", selectedQuestions);
  }
  // Initialiser les questions sélectionnées
  selectQuestions();
 
  // La position de la question actuelle dans la liste des questions sélectionnées
  const currentQuestionPosition = ref(questionLimits - 1);

  // Id de la bonne réponse pour la question actuelle
  const currentQuestionIndex = computed(() => selectedQuestions[currentQuestionPosition.value]);
  const answerId = ref(data[currentQuestionIndex.value].answerId);

  // Score
  const totalScore = ref(0);
  const pieScores = reactive({
    correct: 0,
    incorrect: 0,
    unanswered: 0
  });

  // Fonction pour passer à la question suivante et afficher le score 
  function NextQuestion() {
    if(currentQuestionPosition.value > 0){
      currentQuestionPosition.value--;
      answerId.value = data[selectedQuestions[currentQuestionPosition.value]].answerId;
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

    currentQuestionPosition.value = questionLimits - 1;
    answerId.value = data[selectedQuestions[currentQuestionPosition.value]].answerId;

    // Update highest score if necessary
    const highestScore = ref(JSON.parse(localStorage.getItem("totalScore") ?? false));

    if (totalScore.value > highestScore.value) {
        localStorage.setItem("totalScore", JSON.stringify(totalScore.value));
    }

    totalScore.value = 0;
  }

  function handleNextQuestion() {
    NextQuestion();
  }


 
</script>

<template>
  <div class="screen-root">

     <!-- Ecran démarrage -->
    <transition name="fade" mode="out-in">
      <div v-if="getStarted" class="getStarted" key="start">
        <h1>Welcome to the Quiz Game!</h1>
        <Button
          text="Get Started"
          @click="{ displayElements = true; getStarted = false }"
        />
      </div>
    </transition>

    <!-- Ecran de jeu -->
    <transition name="fade" mode="out-in">
      <div v-if="displayElements" key="display">
        <GameDisplay 
          :currentQuestion="data[currentQuestionIndex]"
          :answerId="answerId"
          :imagePath="resolveImagePath"
          @nextQuestion="handleNextQuestion"
          @scoreUpdate="(score)=>totalScore = score"
          @correctAnswer="()=>pieScores.correct++"
          @badAnswer="()=>pieScores.incorrect++"
          @timeOut="()=>pieScores.unanswered++"
        />         
      </div>
    </transition>   

    <!-- Ecran fin de la partie -->
    
      <div v-if="displayEndScreen" class="getStarted" key="end">
        <transition name="fade" mode="out-in">
              <Restart :totalScore="totalScore" @click="ResetGame"/>
        </transition>

        <transition name="fade" mode="out-in">
              <PieComponent 
                :correct="pieScores.correct" 
                :incorrect="pieScores.incorrect" 
                :unanswered="pieScores.unanswered"
              />
        </transition>

      
      </div>

     <!-- Footer -->
    <Footer />

  </div>
</template>

<style scoped>
 
@import url("./global.css");

</style>
