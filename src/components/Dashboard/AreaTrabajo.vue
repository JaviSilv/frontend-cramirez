<template>
  <div class="graficos-container">
    <!-- 📌 Solo visible para Operador (Rol 3) -->
    <div v-if="userRole === 3" class="grafico-item">
      <ContratosFirmadosPorOperador />
    </div>

    <div v-if="userRole === 3" class="grafico-item">
      <GraficoClientesPorOperador />
    </div>

    <!-- 📌 Visible solo para Supervisor (Rol 2) y Jefe (Rol 1) -->
    <div v-if="userRole <= 2" class="grafico-item">
      <ContratosFirmadosPorOperador />
    </div>

    <div v-if="userRole <= 2" class="grafico-item">
      <ContratosFirmadosGeneral />
    </div>

    <div v-if="userRole <= 2" class="grafico-item">
      <GraficoClientesPorOperador />
    </div>

    <div v-if="userRole <= 2" class="grafico-item">
      <GraficoClientesGeneral />
    </div>
  </div>
</template>
<!--
<script>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ContratosFirmadosPorOperador from "@/components/graficos/ContratosFirmadosPorOperador.vue";
import GraficoClientesPorOperador from "@/components/graficos/GraficoClientesPorOperador.vue";
import GraficoClientesGeneral from "@/components/graficos/GraficoClientesGeneral.vue";
import ContratosFirmadosGeneral from "@/components/graficos/ContratosFirmadosGeneral.vue";

export default {
  components: {
    ContratosFirmadosPorOperador,
    GraficoClientesPorOperador,
    GraficoClientesGeneral,
    ContratosFirmadosGeneral,
  },
  setup() {
    const userRole = ref(null); // 📌 Valor por defecto (Operador)
    const router = useRouter();

    onMounted(() => {
      try {
        const storedUserRole = localStorage.getItem("userRole");
        if (storedUserRole) {
          userRole.value = parseInt(storedUserRole, 10); // 🔥 Asegurarse de que sea un número
          console.log("🎭 Rol detectado:", userRole.value);
        } else {
          console.warn("⚠️ No se detectó un rol, redirigiendo a la página de login.");
          router.push("/login");
        }
      } catch (error) {
        console.error("❌ Error al intentar obtener el rol del usuario:", error);
        router.push("/login");
      }
    });

    return { userRole };
  },
};
</script>
-->

<style scoped>
.graficos-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columnas */
  grid-template-rows: repeat(2, auto);  /* 2 filas automáticas */
  gap: 5px;
  width: 90vw;
  max-width: 1400px;
  margin: 50px auto 0 auto;
  margin-left: 220px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
}

.grafico-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  width: 100%;
  max-width: 500px;
}

/* 📌 Ajuste para pantallas más pequeñas */
@media (max-width: 768px) {
  .graficos-container {
    grid-template-columns: repeat(1, 1fr); /* 1 columna en pantallas pequeñas */
  }
}
</style>
