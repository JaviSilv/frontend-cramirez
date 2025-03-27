<template>
  <div class="chart-container">
    <h2>👤 Contratos Firmados por Operador</h2>
    <select v-model="selectedOperator">
      <option v-for="op in operators" :key="op" :value="op">{{ op }}</option>
    </select>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from "chart.js";

export default {
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const selectedOperator = ref("Javier"); // Valor inicial
    const operators = ["Javier", "Maria", "Carlos", "Ana", "Luis", "Pedro"];
    const contractData = {
      Javier: [50, 30, 10],
      Maria: [40, 20, 15],
      Carlos: [30, 25, 20],
      Ana: [35, 40, 10],
      Luis: [20, 10, 5],
      Pedro: [45, 35, 25]
    };

    const createChart = () => {
      if (!chartCanvas.value) return;

      // Destruir gráfico anterior si existe
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      Chart.register(BarController, BarElement, CategoryScale, LinearScale);

      chartInstance.value = new Chart(chartCanvas.value.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Firmados", "No Firmados", "Legales"],
          datasets: [{
            label: `Contratos de ${selectedOperator.value}`,
            data: contractData[selectedOperator.value],
            backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    };

    onMounted(() => {
      createChart();
    });

    watch(selectedOperator, () => {
      createChart();
    });

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
    });

    return { chartCanvas, selectedOperator, operators };
  }
};
</script>
<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  text-align: center;
}

select {
  margin-bottom: 15px;
  padding: 5px;
}
</style>
