<template>
  <div class="chart-container">
    <h2>📊 Clientes Registrados por Operador</h2>
    <label>Seleccionar Fecha:</label>
    <input type="date" v-model="selectedDate">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale ,Filler } from "chart.js";

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // Fecha de hoy
      clientsData: {
        "2025-03-12": [5, 8, 3, 10, 2, 7], // Datos simulados por fecha
        "2025-03-13": [10, 12, 6, 8, 3, 9]
      }
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    selectedDate() {
      this.createChart();
    }
  },
  methods: {
    createChart() {
      if (this.chart) this.chart.destroy();
      Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale,Filler);
      this.chart = new Chart(this.$refs.chart, {
        type: "line",
        data: {
          labels: ["Javier", "Maria", "Carlos", "Ana", "Luis", "Pedro"],
          datasets: [{
            label: `Clientes ingresados (${this.selectedDate})`,
            data: this.clientsData[this.selectedDate] || [0, 0, 0, 0, 0, 0],
            borderColor: "#4bc0c0",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true
          }]
        }
      });
    }
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
