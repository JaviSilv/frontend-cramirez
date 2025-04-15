<template>
  <div class="pagina">
    <!-- Barra superior -->
    <header class="barra-superior">
      <img src="@/assets/imagenes/LogoCoram.png" alt="Logo" class="logo">

      <!-- Usuario con menú desplegable -->
      <div class="usuario" @click.stop="toggleMenu">
        <img src="@/assets/imagenes/ImgUser.png" alt="Foto de perfil" class="foto-perfil">
        <div class="info-usuario">
          <span class="nombre">{{ usuario.nombre }}</span>
          <span class="rol">{{ usuario.rol }}</span>
        </div>
        <!-- Menú desplegable -->
        <transition name="fade">
          <div v-if="mostrarCerrarSesion" class="menu-desplegable" @click.stop>
            <button @click="cerrarSesion">
              <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          </div>
        </transition>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import "@/assets/layouts/BarraSuperiorDashboard.css";

const router = useRouter();
const mostrarCerrarSesion = ref(false);
const usuario = ref({
  nombre: "Usuario", // Valor por defecto
  rol: "Desconocido" // Valor por defecto
});

// Mapeo de roles
const rolesMap = {
  1: "Jefe",
  2: "Operador",
  3: "Supervisor"
};

onMounted(() => {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    usuario.value = {
      nombre: userData.nombre,
      rol: rolesMap[userData.rol] || "Desconocido"
    };
  }
});

// Alternar menú de cerrar sesión
const toggleMenu = () => {
  mostrarCerrarSesion.value = !mostrarCerrarSesion.value;
};

// Cerrar sesión y redirigir
const cerrarSesion = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  router.push("/");
};

// Cerrar menú si se hace clic fuera
const cerrarSiClickFuera = (event) => {
  if (!event.target.closest(".usuario")) {
    mostrarCerrarSesion.value = false;
  }
};

onMounted(() => document.addEventListener("click", cerrarSiClickFuera));
onBeforeUnmount(() => document.removeEventListener("click", cerrarSiClickFuera));
</script>

<style scoped>
</style>
