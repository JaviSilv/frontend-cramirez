<template>
  <div class="Login-fondo">
    <div class="forgot-container">
      <div class="forgot-box">
        <h2>Recuperar Contraseña</h2>

        <!-- Campo de Usuario -->
        <label for="username">Nombre de Usuario</label>
        <input type="text" id="username" v-model="username" placeholder="Ingrese su usuario" />

        <!-- Campo de Email -->
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Ingrese su email" />

        <button v-if="!codeSent" class="btn-secundario" @click="sendVerificationCode">Enviar Código</button>

        <!-- Campo de Código de Verificación -->
        <div v-if="codeSent">
          <label for="code">Código de Verificación</label>
          <input type="text" id="code" v-model="verificationCode" placeholder="Ingrese el código recibido" />

          <!-- Campo de Nueva Contraseña -->
          <label for="newPassword">Nueva Contraseña</label>
          <input type="password" id="newPassword" v-model="newPassword" placeholder="Ingrese su nueva contraseña" />

          <button class="btn-secundario" @click="resetPassword">Cambiar Contraseña</button>
        </div>

        <p>
          <router-link to="/" class="back-link">Volver al Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const email = ref("");
const verificationCode = ref("");
const newPassword = ref("");
const showErrors = ref(false);
const codeSent = ref(false);
const router = useRouter();

const sendVerificationCode = async () => {
  showErrors.value = true;
  if (!username.value || !email.value) return;

  try {
    const response = await fetch("http://localhost:8080/api/authEmail/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ usuario: username.value, email: email.value }),
    });

    const responseText = await response.text(); // Captura la respuesta en texto

    if (response.ok) {
      //alert("Código enviado. Revisa tu correo electrónico.");
      codeSent.value = true;
    } else {
      alert(responseText || "Usuario o email incorrecto.");
    }
  } catch (error) {
    console.error("Error en el envío del código:", error);
    alert("Hubo un problema con la solicitud. Inténtelo de nuevo.");
  }
};

const resetPassword = async () => {
  showErrors.value = true;
  if (!username.value || !email.value || !verificationCode.value || !newPassword.value) return;

  try {
    const response = await fetch("http://localhost:8080/api/authEmail/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        usuario: username.value,
        email: email.value,
        code: verificationCode.value,
        newPassword: newPassword.value,
      }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      alert("Código incorrecto o expirado.");
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    alert("Hubo un problema con la solicitud. Inténtelo de nuevo.");
  }
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

body {
  font-family: 'Montserrat', sans-serif;
}

/* Fondo con imagen */
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

/* Oscurecer el fondo */
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

/* Caja del formulario */
.forgot-container {
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

/* Botón */
.btn-secundario {
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

.btn-secundario:hover {
  background: lightgray;
  transform: scale(1.05);
}

/* Estilo para el enlace de volver */
.back-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: 10px;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
