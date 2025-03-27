<template>
  <div class="chart-container">
    <h2>👥 Clientes Registrados - General</h2>
    <label>Seleccionar Fecha:</label>
    <input type="date" v-model="selectedDate">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

export default {
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);
    const selectedDate = ref(new Date().toISOString().substr(0, 10));

    const generalData = {
      "2025-03-12": [30, 20, 15, 40, 10, 25, 20],
      "2025-03-13": [25, 30, 10, 35, 15, 20, 25]
    };

    const createChart = () => {
      if (!chartCanvas.value) return;

      // Destruir gráfico anterior si existe
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      Chart.register(PieController, ArcElement, Tooltip, Legend);

      chartInstance.value = new Chart(chartCanvas.value.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Javier", "Maria", "Carlos", "Ana", "Luis", "Pedro", "Supervisor"],
          datasets: [{
            label: `Clientes registrados (${selectedDate.value})`,
            data: generalData[selectedDate.value] || [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#c9cbcf", "#e74c3c"]
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