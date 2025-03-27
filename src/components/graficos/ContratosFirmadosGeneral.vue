<template>
  <div class="chart-container">
    <h2>📜 Contratos Firmados - General</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Filler } from "chart.js";

export default {
  setup() {
    const chartCanvas = ref(null);
    const chartInstance = ref(null);

    onMounted(() => {
      console.log("Componente montado, inicializando gráfico...");
      Chart.register(BarController, BarElement, CategoryScale, LinearScale, Filler);

      if (!chartCanvas.value) {
        console.error("❌ No se encontró el canvas para el gráfico");
        return;
      }

      chartInstance.value = new Chart(chartCanvas.value.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Firmados", "No Firmados", "Legales"],
          datasets: [
            {
              label: "Total Contratos",
              data: [10, 20, 10],
              backgroundColor: ["#36a2eb", "#ff6384", "#ffce56"],
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });

    onUnmounted(() => {
      console.log("Componente desmontado, destruyendo gráfico...");
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
    });

    return { chartCanvas };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  position: relative;
  height: 300px;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
