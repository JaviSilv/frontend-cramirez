<template>
  <div class="chart-container">
    <h2>📊 Clientes Registrados por Operador</h2>
    <label>Seleccionar Fecha:</label>
    <input type="date" v-model="selectedDate">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

export default {
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const selectedDate = ref(new Date().toISOString().substr(0, 10));

    const clientsData = {
      "2025-03-12": [5, 8, 3, 10, 2, 7],
      "2025-03-13": [10, 12, 6, 8, 3, 9]
    };

    const createChart = () => {
      if (!chartCanvas.value) return;

      // Destruir gráfico anterior si existe
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

      chartInstance.value = new Chart(chartCanvas.value.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Javier", "Carlos", "Ana", "Luis", "Pedro"],
          datasets: [
            {
              label: `Clientes ingresados (${selectedDate.value})`,
              data: clientsData[selectedDate.value] || [0, 0, 0, 0, 0, 0],
              borderColor: "#4bc0c0",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true
            }
          ]
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

    watch(selectedDate, () => {
      createChart();
    });

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
    });

    return { chartCanvas, selectedDate };
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

input {
  margin-bottom: 15px;
  padding: 5px;
}
</style>
