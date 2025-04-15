<template>
  <div class="dashboard-container">
    <BarraLateralDashboard />
    <div class="main-content">
      <BarraSuperiorDashboard />
      <div class="content-container">
        <div class="content">
          <h1 class="title">Registro de Cliente</h1>

          <div class="input-container">
            <label>¿Es peruano o extranjero?</label>
            <div class="nacionalidad-toggle">
              <button :class="{ active: nacionalidad === 'peruano' }" @click="nacionalidad = 'peruano'; limpiarDatos()">🇵🇪 Peruano</button>
              <button :class="{ active: nacionalidad === 'extranjero' }" @click="nacionalidad = 'extranjero'; limpiarDatos()">🌍 Extranjero</button>
            </div>
          </div>

          <div class="input-container" v-if="nacionalidad === 'peruano'">
            <input type="text" v-model="dni" placeholder="Ingresar DNI (8 dígitos)" maxlength="8" @input="buscarCliente"/>
          </div>
          <div class="input-container" v-if="nacionalidad === 'extranjero'">
            <input type="text" v-model="carnetExtranjeria" placeholder="Ingresar Carnet de Extranjería (12 dígitos)" maxlength="12" @input="buscarCliente"/>
          </div>

          <div v-if="estadoCliente === 'Cliente nuevo'" class="alerta-nuevo">
            <p>⚠️ Cliente no encontrado en el sistema. Puedes continuar para registrar sus datos.</p>
            <button class="btn" @click="irFormulario">Continuar</button>
          </div>

          <div v-if="estadoCliente === 'Cliente registrado - ya existe en el sistema'" class="alerta-registrado">
            <p>✅ Cliente ya fue registrado en el sistema</p>
            <button class="btn" @click="irFormulario">Continuar</button>
          </div>

          <div v-if="cliente && cliente.nombreCompleto" class="datos-cliente">
            <h2>🧾 Datos del Cliente</h2>
            <ul>
              <li><strong>Nombres:</strong> {{ cliente.nombres }}</li>
              <li><strong>Apellido Paterno:</strong> {{ cliente.apellidoPaterno }}</li>
              <li><strong>Apellido Materno:</strong> {{ cliente.apellidoMaterno }}</li>
              <li><strong>Nombre Completo:</strong> {{ cliente.nombreCompleto }}</li>
              <li><strong>Tipo de Documento:</strong> {{ cliente.tipoDocumento }}</li>
              <li><strong>Número de Documento:</strong> {{ cliente.numeroDocumento }}</li>
              <li><strong>Dígito Verificador:</strong> {{ cliente.digitoVerificador }}</li>
            </ul>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BarraSuperiorDashboard from "@/components/Dashboard/BarraSuperiorDashboard.vue";
import BarraLateralDashboard from "@/components/Dashboard/BarraLateralDashboard.vue";

export default {
  components: {
    BarraLateralDashboard,
    BarraSuperiorDashboard,
  },
  data() {
    return {
      nacionalidad: "",
      dni: "",
      carnetExtranjeria: "",
      cliente: {},
      estadoCliente: "",
    };
  },
  methods: {
    limpiarDatos() {
      this.dni = "";
      this.carnetExtranjeria = "";
      this.cliente = {};
      this.estadoCliente = "";
    },

    buscarCliente() {
      const documento = this.nacionalidad === "peruano" ? this.dni : this.carnetExtranjeria;
      const tipoDocumento = this.nacionalidad === "peruano" ? "DNI" : "CE";

      // Si es carnet de extranjería, eliminamos el localStorage
      if (this.nacionalidad === "extranjero") {
        localStorage.removeItem("nombreCompleto");
      }

      console.log("Buscando cliente con:", documento, tipoDocumento);

      if (
          (tipoDocumento === "DNI" && documento.length !== 8) ||
          (tipoDocumento === "CE" && documento.length !== 12)
      ) {
        this.cliente = {};
        this.estadoCliente = "";
        return;
      }

      // Paso 1: buscar datos de RENIEC/SUNAT (u otra fuente externa)
      fetch(`http://localhost:8080/api/buscarCliente/${documento}?tipo=${tipoDocumento}`)
          .then((response) => response.json())
          .then((data) => {
            if (data && data.nombres) {

              fetch(`http://localhost:8080/api/clientes/existe?numeroIdentificacion=${documento}`)
                  .then((response) => response.json())
                  .then((existe) => {
                    this.cliente = {
                      nombres: data.nombres,
                      apellidoPaterno: data.apellidoPaterno,
                      apellidoMaterno: data.apellidoMaterno,
                      nombreCompleto: data.nombreCompleto,
                      tipoDocumento: data.tipoDocumento,
                      numeroDocumento: data.numeroDocumento,
                      digitoVerificador: data.digitoVerificador,
                    };

                    this.estadoCliente = existe
                        ? "Cliente registrado - ya existe en el sistema"
                        : "Cliente nuevo";

                    localStorage.setItem("numeroDocumento", documento);
                    if (this.cliente.nombreCompleto) {
                      localStorage.setItem("nombreCompleto", this.cliente.nombreCompleto);
                    }
                  })
                  .catch((error) => {
                    console.error("Error al verificar existencia del cliente:", error);
                    this.estadoCliente = "Cliente nuevo";
                  });
            } else {
              this.cliente = {};
              this.estadoCliente = "Cliente nuevo";
              localStorage.setItem("numeroDocumento", documento);
              localStorage.removeItem("nombreCompleto");
            }
          })
          .catch((error) => {
            console.error("Error al consultar el backend:", error);
            this.cliente = {};
            this.estadoCliente = "Cliente nuevo";
          });
    },

    irFormulario() {
      const documento = this.dni || this.carnetExtranjeria;
      const tipoDocumento = this.nacionalidad === "peruano" ? "DNI" : "CE";

      const datos = {
        dni: this.dni || this.carnetExtranjeria,
        nombres: this.cliente.nombres,
        apellidoPaterno: this.cliente.apellidoPaterno,
        apellidoMaterno: this.cliente.apellidoMaterno,
        nombreCompleto: this.cliente.nombreCompleto,
        tipoDocumento: this.cliente.tipoDocumento,
        numeroDocumento: this.cliente.numeroDocumento,
        digitoVerificador: this.cliente.digitoVerificador,
      };

      localStorage.setItem("numeroDocumento", documento);
      if (datos.nombreCompleto) {
        localStorage.setItem("nombreCompleto", datos.nombreCompleto);
      }

      this.$router.push({ path: "/dashboard/formularios/detalle-cliente", query: datos });
    },
  },
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 8px;
  width: 90vw;
  max-width: 1400px;
  margin: 70px auto 0 auto; /* Espacio arriba para barra superior */
  padding: 8px;
  position: relative;
  z-index: 10;
  height: calc(100vh - 70px);
  overflow-y: auto;
}

.content {
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: auto;
  overflow-y: auto;
}

.input-container {
  margin-top: 20px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  transition: border 0.3s ease;
}
input[type="text"]:focus {
  border: 1px solid #007bff;
  outline: none;
}

.result {
  background: #FFF3E0;
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
  width: 100%;
  color: #333;
  margin-top: 20px;
}
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.result-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}
.result strong {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
  color: #E67E22;
}
.result span {
  font-size: 16px;
  text-align: right;
  flex: 1;
}

button {
  background: linear-gradient(135deg, #FFA500, #E67E22);
  color: black;
  padding: 14px 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}
button:hover {
  background: linear-gradient(135deg, #E67E22, #D35400);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.nacionalidad-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.nacionalidad-toggle button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background: #f9f9f9;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: 500;
}
.nacionalidad-toggle button.active {
  background: #e67e22;
  color: white;
  border-color: #e67e22;
}

/* RESPONSIVE */
@media (min-width: 769px) {
  .content-container {
    margin-left: 200px; /* Deja espacio para la barra lateral si existe */
  }
}

@media (max-width: 768px) {
  .content-container {
    margin-left: 0;
    padding: 16px;
    width: 100%;
  }

  .content {
    padding: 20px;
    margin-top: 80px;
  }
}
.alerta-nuevo {
  color: #d9534f;
  font-weight: bold;
  margin: 10px 0;
}
</style>
