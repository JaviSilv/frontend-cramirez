import { createApp } from 'vue';
import App from './App.vue';
import router from "@/routes.js";

const app = createApp(App);

// Solo habilitar Devtools en desarrollo (no es necesario deshabilitar en producción)
if (!import.meta.env.PROD) {
    console.log("🔧 Modo desarrollo: DevTools habilitadas");
}

try {
    app.use(router);
    app.mount('#app');
    console.log("🚀 Aplicación montada correctamente");
} catch (error) {
    console.error("❌ Error al montar la aplicación:", error);
}
