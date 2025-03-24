<template>
  <div class="error-container">
    <div class="overlay"></div>
    <div class="error-content">
      <h1>🚫 403 - Acceso Denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <router-link to="/" class="back-button">🔙 Volver al Inicio</router-link>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.error-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/imagenes/FondoDashboard.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Capa oscura para mejorar la visibilidad del texto */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
}

/* Caja de contenido */
.error-content {
  position: relative;
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px); /* Efecto de desenfoque en el fondo */
  animation: fadeIn 0.5s ease-in-out;
}

/* Animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos del título */
h1 {
  color: #d9534f;
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: bold;
}

/* Estilos del texto */
p {
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 25px;
}

/* Botón de regreso */
.back-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #d9534f;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: #c9302c;
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
</style>
<script setup lang="ts">
</script>