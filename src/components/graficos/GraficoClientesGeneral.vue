<template>
  <div class="chart-container">
    <h2>👥 Clientes Registrados - General</h2>
    <label>Seleccionar Fecha:</label>
    <input type="date" v-model="selectedDate">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Chart, PieController, ArcElement, Tooltip, Legend ,Filler } from "chart.js";

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      generalData: {
        "2025-03-12": [30, 20, 15, 40, 10, 25, 20], // Incluye operadores + supervisor
        "2025-03-13": [25, 30, 10, 35, 15, 20, 25]
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
      Chart.register(PieController, ArcElement, Tooltip, Legend);
      this.chart = new Chart(this.$refs.chart, {
        type: "pie",
        data: {
          labels: ["Javier", "Maria", "Carlos", "Ana", "Luis", "Pedro", "Supervisor"],
          datasets: [{
            label: `Clientes registrados (${this.selectedDate})`,
            data: this.generalData[this.selectedDate] || [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#c9cbcf", "#e74c3c"]
          }]
        }
      });
    }
  }
};
</script>
