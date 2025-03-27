<template>
  <div class="Login-fondo">
    <div class="login-container">
      <div class="login-box">
        <h2>INICIAR SESIÓN</h2>

        <label for="username">USUARIO</label>
        <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Ingrese su usuario"
        />
        <span v-if="showErrors && !username" class="error-message">
          ¡Es obligatorio!
        </span>

        <label for="password">CONTRASEÑA</label>
        <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Ingrese su contraseña"
        />
        <span v-if="showErrors && !password" class="error-message">
          ¡Es obligatorio!
        </span>

        <div class="remember-me">
          <input type="checkbox" id="remember" v-model="remember" />
          <label for="remember">Recordarme</label>
        </div>

        <button @click="validateForm">
          INGRESAR
        </button>

        <p>
          <a href="#" class="forgot-password" @click.prevent="goToForgotPassword">
            OLVIDASTE TU CONTRASEÑA
          </a>
        </p>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const showErrors = ref(false);
const errorMessage = ref("");
const router = useRouter();

const validateForm = async () => {
  showErrors.value = true;
  errorMessage.value = "";

  if (!username.value || !password.value) {
    errorMessage.value = "⚠️ Todos los campos son obligatorios.";
    return;
  }
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: username.value,
      contrasena: password.value,
    }),
  });
    const data = await response.json();
    console.log("📡 Respuesta del backend:", data);

    if (response.ok) {
      if (!data.rol || !data.idOperario || !data.nombre) {
        console.error("⚠️ Respuesta incompleta del backend:", data);
        errorMessage.value = "❌ Error en la autenticación.";
        return;
      }

      console.log("✅ Inicio de sesión exitoso:", data);

      const userRole = parseInt(data.rol, 10);
      const userData = {
        nombre: data.nombre,
        rol: userRole,
        idOperario: data.idOperario,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      console.log("🗄️ Usuario guardado en localStorage:", userData);

      switch (userRole) {
        case 1:
        case 2:
        case 3:
          router.push("/dashboard");
          break;
        default:
          console.warn("⚠️ Rol no permitido:", userRole);
          errorMessage.value = "❌ No tienes acceso.";
          router.push("/403");
      }
    } else {
      console.error("❌ Error en la respuesta del servidor:", data);
      errorMessage.value = data.message || "❌ Usuario o contraseña incorrectos.";
    }
  } catch (error) {
    console.error("⚠️ Error de conexión:", error);
    errorMessage.value = "⚠️ Error de conexión con el servidor.";
  }
};

const goToForgotPassword = () => {
  router.push("/login-olvidar-contra");
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.Login-fondo {
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

.Login-fondo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Fondo más oscuro para resaltar el login */
  backdrop-filter: blur(8px);
  z-index: 1;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  background: rgba(0, 0, 0, 0.75);
  padding: 35px;
  z-index: 2;
  transition: transform 0.3s ease-in-out;
}
/* Título */
h2 {
  color: white;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

/* Inputs */
label {
  color: white;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 400;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: none;
  border-radius: 8px;
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

input:focus {
  transform: scale(1.05);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.2);
}

/* Botón */
button {
  margin-top: 20px;
  padding: 12px;
  width: 100%;
  background: #ffffff; /* Botón blanco */
  color: black;
  font-weight: 700;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.remember-me {
  display: flex;
  justify-content: flex-start; /* Alineación a la izquierda */
  align-items: baseline; /* Alinea el texto un poco más arriba */
  width: 100%;
  margin-top: 10px;
  gap: 10px; /* Espacio entre el checkbox y el texto */
}

.remember-me input {
  width: 16px; /* Tamaño más estándar para el checkbox */
  height: 16px;
  cursor: pointer;
  margin-bottom: 2px; /* Ajuste para subir el texto */
}

.remember-me label {
  color: white;
  font-size: 14px;
  cursor: pointer; /* Hace clickeable el texto junto con el checkbox */
}

/* Enlace de "Olvidaste tu contraseña" */
.forgot-password {
  color: white;
  text-align: center;
  display: block;
  margin-top: 15px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}

.forgot-password:hover {
  color: #ffcc00;
  text-decoration: underline;
}

/* Mensaje de error */
.error-message {
  color: white;
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
}
</style>