<template>
  <div class="dashboard-container">
    <BarraLateral />
    <div class="main-content">
      <BarraSuperior />
      <div class="content-container">
        <div class="content">
          <h1 class="title">Registro Cliente</h1>

          <!-- Input para número de RENIEC -->
          <div class="input-container">
            <input
                type="text"
                v-model="dni"
                placeholder="Ingresar Número RENIEC"
                @input="buscarCliente"
                maxlength="8"
            />
          </div>

          <!-- Mensaje para ingreso manual si no hay datos -->
          <button class="btn" v-if="!cliente.nombres" @click="irIngresoManual">
            Ingreso Manual
          </button>

          <!-- Resultado de búsqueda con los datos -->
          <transition name="fade">
            <div v-if="cliente.nombres" class="result">
              <div class="result-item">
                <strong>Nombres:</strong> <span>{{ cliente.nombres }}</span>
              </div>
              <div class="result-item">
                <strong>Apellido Paterno:</strong> <span>{{ cliente.apellidoPaterno }}</span>
              </div>
              <div class="result-item">
                <strong>Apellido Materno:</strong> <span>{{ cliente.apellidoMaterno }}</span>
              </div>
              <div class="result-item">
                <strong>Nombre Completo:</strong> <span>{{ cliente.nombreCompleto }}</span>
              </div>
              <div class="result-item">
                <strong>Tipo de Documento:</strong> <span>{{ cliente.tipoDocumento }}</span>
              </div>
              <div class="result-item">
                <strong>Numero de Documento:</strong> <span>{{ cliente.numeroDocumento }}</span>
              </div>
              <div class="result-item">
                <strong>Digito Verificador:</strong> <span>{{ cliente.digitoVerificador  }}</span>
              </div>
              <button class="btn" @click="irFormulario">Continuar</button>
            </div>
          </transition>
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
    BarraSuperiorDashboard
  },
  data() {
    return {
      dni: "",
      cliente: {} // Objeto donde se almacenarán los datos encontrados
    };
  },
  methods: {
    irIngresoManual() {
      localStorage.removeItem('nombreCompleto');
      if (this.dni) {
        localStorage.setItem('numeroDocumento', this.dni); // Guarda el DNI ingresado aunque no exista en RENIEC
      }
      this.$router.push("/formulario-clientes");
    },
    buscarCliente() {
      if (this.dni.length !== 8) { // Se asegura de que el DNI sea de 8 dígitos
        this.cliente = {}; // Limpia los datos si el DNI no es válido aún
        return;
      }

      fetch(`http://localhost:8080/api/buscarCliente/${this.dni}`)
          .then(response => response.json())
          .then(data => {
            if (data.nombres) {
              this.cliente = {
                nombres: data.nombres,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                nombreCompleto: data.nombreCompleto,
                tipoDocumento: data.tipoDocumento,
                numeroDocumento: data.numeroDocumento,
                digitoVerificador: data.digitoVerificador ,
              };
            } else {
              this.cliente = {};
              localStorage.removeItem('nombreCompleto');
              localStorage.removeItem('numeroDocumento');
            }
          })
          .catch(error => {
            console.error("Error al consultar el backend:", error);
            this.cliente = {};
          });
    },

    irFormulario() {
      if (this.cliente.nombres) {
        const datos = {
          dni: this.dni,
          nombres: this.cliente.nombres,
          apellidoPaterno: this.cliente.apellidoPaterno,
          apellidoMaterno: this.cliente.apellidoMaterno,
          nombreCompleto: this.cliente.nombreCompleto,
          tipoDocumento: this.cliente.tipoDocumento,
          numeroDocumento: this.cliente.numeroDocumento,
          digitoVerificador: this.cliente.digitoVerificador ,
        };

        localStorage.setItem('nombreCompleto', this.cliente.nombreCompleto);
        localStorage.setItem('numeroDocumento', this.cliente.numeroDocumento);
        this.$router.push({ path: "/formulario-clientes", query: datos });
      }
    },
  }
};
</script>

<style scoped>
.content-container {
  display: flex;
  box-sizing: border-box; /* Evita que el padding afecte el tamaño total */
  gap: 8px; /* Espacio entre gráficos */
  width: 90vw; /* Se adapta al ancho de la ventana */
  max-width: 1400px;
  margin: auto; /* Centra el contenedor */
  margin-top: 10px;
  margin-left: 200px;
  padding: 8px;
  position: relative;
  z-index: 10;
}

.content {
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 420px; /* Tamaño del formulario */
  max-width: 90%; /* Se adapta en pantallas pequeñas */
  margin-top: 150px; /* O más, según sea necesario */
  margin-left: 500px; /* Aumenta o disminuye según necesites */
}
@media (max-width: 768px) {
  .content-container {
    width: 100%;
    padding: 4px;
  }

  .content {
    width: 90%;
    padding: 20px;
    margin-top: 50px; /* Reduce margen en móviles */
  }
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
  background: #FFF3E0; /* Naranja muy claro */
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
  text-align: center; /* Alineación centrada */
  max-width: 90%; /* Evita que se expanda demasiado */
  margin: auto; /* Centrado automático */
  color: #333; /* Texto oscuro */
}

.result-item {
  display: flex;
  justify-content: center; /* Centra los elementos */
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.result-item:last-child {
  margin-bottom: 0; /* Evita margen extra en el último elemento */
  border-bottom: none;
}

.result-item strong {
  font-size: 16px;
  font-weight: bold;
  color: #E67E22; /* Naranja fuerte */
  text-align: left;
  width: 50%;
}
.result-item span {
  font-size: 16px;
  text-align: right;
  width: 50%;
}
button {
  background: linear-gradient(135deg, #FFA500, #E67E22); /* Naranja vibrante */
  color: white;
  padding: 14px 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  width: 106%;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}


button:hover {
  background: linear-gradient(135deg, #E67E22, #D35400); /* Naranja oscuro */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
