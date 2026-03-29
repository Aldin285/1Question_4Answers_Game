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
@import url("./Timer.css");
 
</style>