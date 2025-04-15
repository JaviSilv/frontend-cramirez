<template>
  <div class="dashboard-container">
    <BarraLateral />
    <div class="main-content">
      <BarraSuperior />
      <div class="area-trabajo">
      </div>
    </div>
  </div>

</template>

<script>
import BarraLateralDashboard from "@/components/Dashboard/BarraLateralDashboard.vue";
import BarraSuperiorDashboard from "@/components/Dashboard/BarraSuperiorDashboard.vue";

export default {
  components: {
    BarraLateral: BarraLateralDashboard,
    BarraSuperior: BarraSuperiorDashboard
  }
};

</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh; /* importante para que ocupe toda la pantalla */
  overflow: hidden;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100vh; /* para que herede el tamaño total de viewport */
}

.area-trabajo {
  flex-grow: 1; /* para que ocupe todo el espacio restante debajo de la barra superior */
  padding: 20px;
  background: #f8f9fa;
  overflow-y: auto;
}

</style>
