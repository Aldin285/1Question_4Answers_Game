<script setup>

  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  import { ref, computed, reactive } from 'vue';

  const props = defineProps({
    correct: {
      type: Number,
      required: true,
      defaults: 0
    },
    incorrect: {
      type: Number,
      required: true,
      defaults: 0
    },
    unanswered: {
      type: Number,
      required: true,
      defaults: 0
    }
  });

  // Register ChartJS components and set global defaults
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.defaults.font.family = "castoro-titling";
  ChartJS.defaults.font.size = 12;
  ChartJS.defaults.color = 'white';


  // Test data for the pie chart
  const testData = [
    { label: 'Correct', value: props.correct, backgroundColor: '#2e8b57', borderColor: '#FFFFFF', borderWidth: 2 },
    { label: 'Incorrect', value: props.incorrect, backgroundColor: '#EB4141', borderColor: '#FFFFFF', borderWidth: 2 },
    { label: 'Unanswered', value: props.unanswered, backgroundColor: '#BBBBBB', borderColor: '#FFFFFF', borderWidth: 2 },
  ];

  // Pie Chart Options
  // This will be used to customize the appearance and behavior of the pie chart
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    borderAlign: 'center',
    spacing : 10,
     
  });

  // Pie Chart Data
  // This is the data structure that ChartJS expects for rendering the pie chart, using our test data
  const chartData = ref({
    type: 'pie',
    labels: testData.map(item => item.label),
    datasets: [
      {
        label: " Number of Questions",
        data: testData.map(item => item.value),
        backgroundColor: testData.map(item => item.backgroundColor),
        borderColor: testData.map(item => item.borderColor),
        borderWidth: testData.map(item => item.borderWidth),
        color: '#000000',
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: true,
      plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20,
                        family: "castoro-titling",
                        weight: 400,
                        style: "normal",
                    }
                }
            }
        }
    }
  });

 
</script>

<template>

    <!-- Pie Chart Container -->
    <div class="pie-wrapper">
        <Pie
          id="pie_chart_id"
          :options="chartOptions"
          :data="chartData"
        />
    </div>


</template>

<style scoped>
    @import url("./PieComponent.css");
</style>
