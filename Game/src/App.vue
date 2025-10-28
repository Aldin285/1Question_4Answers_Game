<script setup>
  import answer from './components/Answer.vue';
  import question from './components/Question.vue';
  import timer from './components/Timer.vue';
  import score from './components/Score.vue';
  import data from "./data/quiz.json"

  import { ref, onMounted,watchEffect, computed, reactive } from 'vue';

  // Affichage
  const getStarted = ref(true);
  const displayElements = ref(false);
  const displayEndScreen = ref(false);

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

  
  
  onMounted(() => {
    watchEffect(async () => {
      TimeOut();
    })
  });
 
</script>

<template>
  <div>
    <div v-if="displayElements" class="displayElements">

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
        :imgURL="data[currentQuestionIndex].imageURL" />
    
    <!-- Selection des réponses -->
      
      <div class="answerSelect">

         <div v-for="answer in data[currentQuestionIndex].answers" :key="answer.id" >
           <answer   :id="answer.id"
            :answer="answer.answerText"
            :style="answerId === answer.id ? rightAnswerStyle : wrongAnswerStyle"
            @click="CheckAnswer" :disabled="disableButtons"/>
        </div>
        
      </div>

    <footer class="app-footer">
      <div class="footer-inner">
        <p>© 2025 Quiz Game by Alla-Eddine BOUKABOU — built with Vue</p>
      </div>
    </footer>

  </div>

  <!-- Get started screen -->
  <div v-if="getStarted">
    <div class="getStarted">
      <h1>Welcome to the Quiz Game!</h1>
      <button @click="{displayElements = true;getStarted=false}"  class="button-82-pushable">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
        Get Started
      </span>
      </button>
    </div>
  </div>

  <!-- End and restart screen -->
  <div v-if="displayEndScreen">
    <div class="getStarted">
      <h1>Your final score is : {{ totalScore }}</h1>
      <button @click="{displayElements = false;getStarted=true; displayEndScreen=false}"  class="button-82-pushable">
      <span class="button-82-shadow"></span>
      <span class="button-82-edge"></span>
      <span class="button-82-front text">
        Play again
      </span>
      </button>
    </div>
  </div>


  </div>
</template>

<style scoped>
 

  /* Affichage des réponses */
  .answerSelect{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 3.5em;
    padding-right:10em;
    padding-left:10em;
  }

  /* affichage des éléments */
  .displayElements{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* Footer */
  .app-footer{
    width: 100%;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
    color: rgba(255,255,255,0.95);
  }

  .app-footer .footer-inner{
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Get started button style */

   .getStarted {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 2em;
    color: white;
  }

  .button-82-pushable {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  .button-82-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  .button-82-edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }

  .button-82-front {
    display: block;
    position: relative;
    padding: 12px 27px;
    border-radius: 12px;
    font-size: 1.1rem;
    color: white;
    background: hsl(345deg 100% 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }

  @media (min-width: 768px) {
    .button-82-front {
      font-size: 1.25rem;
      padding: 12px 42px;
    }
  }

  .button-82-pushable:hover {
    filter: brightness(110%);
    -webkit-filter: brightness(110%);
  }

  .button-82-pushable:hover .button-82-front {
    transform: translateY(-6px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  .button-82-pushable:active .button-82-front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  .button-82-pushable:hover .button-82-shadow {
    transform: translateY(4px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }

  .button-82-pushable:active .button-82-shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .button-82-pushable:focus:not(:focus-visible) {
    outline: none;
  }

</style>
