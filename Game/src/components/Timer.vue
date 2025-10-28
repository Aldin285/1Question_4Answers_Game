<script setup>
  import { useTimer, useStopwatch } from 'vue-timer-hook';
  import { onMounted,watchEffect, computed, ref } from 'vue';

  // Props
  const props = defineProps({
      timeLimit:{
          type: Number,
          default: 20
      },
      stop:{
        type: Boolean,
        default: false
      },
      restart:{
        type: Boolean,
        default: false
      }
  });

 
  const time = new Date();
  time.setSeconds(time.getSeconds() + props.timeLimit);

  let chrono = useTimer(time)

  const totalLength = ref(2 * Math.PI * 45);


  const timeFraction = computed(() =>{

  const fraction =  (chrono.seconds.value)/ props.timeLimit;
  const adjFraction = fraction -(1 / props.timeLimit) * (1-fraction);

//   Pour éviter que ça renvoie une valeur négative
  return Math.max(0,  adjFraction);
});

  const elapsedDash = computed(() => (timeFraction.value * totalLength.value))

   // Emit
  const emit = defineEmits(['timeLeft','elapsedDash']);

  onMounted(() => {
  watchEffect(async () => {
    
    if(chrono.isExpired.value) {
        // console.log('The timer has expired')
    }

    if (props.stop){
      console.log("Chrono stopped")
      chrono.pause();
    }else{
      chrono.resume();
    }

    if (props.restart){
      console.log("Chrono restarted")

       const newTime = new Date();
       newTime.setSeconds(newTime.getSeconds() + props.timeLimit);

      chrono.restart(newTime);
    }

    emit('timeLeft', chrono.seconds.value);
    emit('elapsedDash', elapsedDash.value, totalLength.value);
   })
  });

</script>

<template>
  <div class="timer-root">
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
</div>
</template>

<style scoped>
.timer-root {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 999; 
  pointer-events: none; 
}


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