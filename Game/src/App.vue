<script setup>
  import OptionBox from './Views/OptionBox/OptionBox.vue';
  import question from './Views/Question/Question.vue';
  import timer from './Views/Timer/Timer.vue';
  import score from './Views/Score/Score.vue';
  import Footer from './Views/Footer/Footer.vue';
  import data from "./data/quiz.json"

  import { ref, onMounted,watchEffect, computed, reactive } from 'vue';

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

  // Pour la réponse sélectionnée
  const selectedAnswer = ref(null);

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

  // Pour les réponses
  const rightAnswerStyle = ref({});
  const wrongAnswerStyle = ref({});
  const disableButtons = ref(false);

  // Chrono
  const timeLeft = ref();
  const stopTimer = ref(false);
  const restartTimer = ref(false);
  const dashLength = ref(0);
  const totalDashLength = ref(0);

  // Score
  const checkAnswer = ref(false);
  const totalScore = ref(0);

  // Fonction pour passer à la question suivante et afficher le score final
  function NextQuestion() {
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
        checkAnswer.value = false;
        restartTimer.value = true;
        setTimeout(() => {
          restartTimer.value = false;
        }, 100);
    
      }else{
           displayElements.value = false;
           displayEndScreen.value = true;
        console.log("Quiz finished")
      }
    }, 3000);
  }

  function CheckAnswer(e) {
    // Récupère l'id de la réponse sélectionnée
    selectedAnswer.value = e.target.id;

    // Changement de style par rapport à la réponse sélectionnée
    // Bonne réponse
    if(answerId.value == selectedAnswer.value){
      // console.log("You picked the right answer")

      rightAnswerStyle.value = {
        border: '2px solid green',
        backgroundColor: 'lightgreen',
        cursor: 'not-allowed',
      };

      wrongAnswerStyle.value = {
        cursor: 'not-allowed',
      };

      checkAnswer.value = true;
    }else{
      // Mauvaise réponse
      // console.log("You picked the wrong answer bug")

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
    NextQuestion();
    
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
      NextQuestion();
    }
  }

  // Reset game
  function ResetGame(){

    getStarted.value = true;
    displayEndScreen.value = false;

    selectQuestions();

    currentQuestionIndex.value = selectedQuestions[questionLimits-1];
    answerId.value = data[currentQuestionIndex.value].answerId;

    // Réinitialise les styles et les variables
    rightAnswerStyle.value = {};
    wrongAnswerStyle.value = {};
    disableButtons.value = false;
    selectedAnswer.value = null;
    stopTimer.value = false;
    checkAnswer.value = false;
    restartTimer.value = true;
    totalScore.value = 0;

    setTimeout(() => {
      restartTimer.value = false;
    }, 100);

   
  }
  
  
  onMounted(() => {
    watchEffect(async () => {
      TimeOut();
    })
  });
 
</script>

<template>
  <div class="screen-root">

    <transition name="fade" mode="out-in">
      <div v-if="displayElements" class="displayElements" key="display">

      <!-- Timer -->
      <timer :timeLimit="20"
       :stop="stopTimer" 
       :restart="restartTimer"
        @timeLeft='(tl) => timeLeft = tl'
        @elapsedDash="(dash, length)=>{
           dashLength = dash;
           totalDashLength = length;
        }" 
        />

      <!-- Score -->
       <score :dashLeft="dashLength" :totalDash="totalDashLength" :check="checkAnswer" @finalScore="(score) => totalScore = score" />

      <!--Question -->
        <question :question="data[currentQuestionIndex].question"
          :imgURL="resolveImagePath(data[currentQuestionIndex].imageURL)" />
      
      <!-- Selection des réponses -->
        
        <div class="answerSelect">

          <div v-for="option in data[currentQuestionIndex].answers" :key="option.id" >
              <OptionBox :id="option.id"
                :answer="option.answerText"
                :style="answerId === option.id ? rightAnswerStyle : wrongAnswerStyle"
                @click="CheckAnswer" :disabled="disableButtons"/>
          </div>
          
        </div>

        <!-- Calling the footer component -->
        <Footer />

    </div>
    </transition>

    <!-- Get started screen -->
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

    <!-- End screen -->
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

  </div>
</template>

<style scoped>
 
@import url("./global.css");

</style>
