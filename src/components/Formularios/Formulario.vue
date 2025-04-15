<template>
  <div class="form-container">
    <div class="form-content">
      <h2>Registro de Cliente</h2>
      <form @submit.prevent="enviarFormulario" class="formulario">

        <!-- Sección: Datos Personales -->
        <FormSection v-if="currentStep === 1" title="Datos Personales">
          <InputText v-model="formData.nombreCliente" label="Nombre y Apellido" />
          <InputText v-model="formData.ocupacionCliente" label="Ocupación" />
          <SelectBox v-model="formData.tipoIdentificacion" :options="tipoIdentificacion" label="Tipo de Identificación:" />
          <InputText v-model="formData.numIdentificacionUsuario" label="Número de Identificación:" />
          <SelectBox v-model="formData.paisOrigen" :options="paisOrigen" label="País de Origen:" />
          <SelectBox v-model="formData.paisdeResidencia" :options="paisdeResidencia" label="País de Residencia:" />
          <SelectBox v-model="formData.departamento" :options="departamentos" label="Departamento" />
          <SelectBox v-model="formData.provincia" :options="provincias" label="Provincia:" />
          <SelectBox v-model="formData.distrito" :options="distritos" label="Distritos:" />
          <InputText v-model="formData.direccion" label="Dirección:" />
          <InputText v-model="formData.correoUsuario" label="Correo Electrónico:" />
          <SelectBox v-model="formData.prefijoTelefonico" :options="prefijoTelefonico" label="Número Telefónico:" />
          <input v-model="formData.numTelefonico" type="text" id="numTelefonico" placeholder="Ingrese su número" />
          <SelectBox v-model="formData.estadoCivil" :options="estadoCivil" label="Estado Civil:" />

          <button type="button" @click="nextStep">Siguiente</button>
        </FormSection>

        <!-- Sección: Datos del Cónyuge (solo si está casado) -->
        <FormSection v-if="currentStep === 2 && formData.estadoCivil === 'Casado'" title="Datos del Cónyuge">
          <InputText v-model="formData.nombreConyuge" label="Nombre y Apellido" />
          <InputText v-model="formData.ocupacionConyuge" label="Ocupación" />
          <SelectBox v-model="formData.tipoIdentificacionConyuge" :options="tipoIdentificacion" label="Tipo de Identificación:" />
          <InputText v-model="formData.numIdentificacionConyuge" label="Número de Identificación:" />
          <SelectBox v-model="formData.paisOrigenConyuge" :options="paisOrigen" label="País de Origen:" />
          <SelectBox v-model="formData.paisResidenciaConyuge" :options="paisdeResidencia" label="País de Residencia:" />
          <SelectBox v-model="formData.departamentoConyuge" :options="departamentos" label="Departamento" />
          <SelectBox v-model="formData.provinciaConyuge" :options="provincias" label="Provincia:" />
          <SelectBox v-model="formData.distritoConyuge" :options="distritos" label="Distritos:" />
          <InputText v-model="formData.direccionConyuge" label="Dirección:" />
          <InputText v-model="formData.correoConyuge" label="Correo Electrónico:" />
          <SelectBox v-model="formData.prefijoTelefonicoConyuge" :options="prefijoTelefonico" label="Número Telefónico:" />
          <input v-model="formData.numTelefonicoConyuge" type="text" id="numTelefonicoConyuge" placeholder="Ingrese su número" />

          <div class="buttons">
            <button type="button" @click="prevStep">Anterior</button>
            <button type="button" @click="nextStep">Siguiente</button>
          </div>
        </FormSection>

        <!-- Sección: Copropietarios -->
        <FormSection v-if="currentStep === 3" title="Copropietarios">
          <InputText v-model.number="formData.numCopropietarios" label="Número de Copropietarios" type="number" min="0" @input="generarCopropietarios" />

          <div v-for="(copropietario, index) in formData.copropietarios" :key="index" class="copropietario-section">
            <h3>Copropietario {{ index + 1 }}</h3>
            <InputText v-model="copropietario.nombre" label="Nombre y Apellido" />
            <InputText v-model="copropietario.ocupacion" label="Ocupación" />
            <SelectBox v-model="copropietario.tipoIdentificacion" :options="tipoIdentificacion" label="Tipo de Identificación:" />
            <InputText v-model="copropietario.numIdentificacion" label="Número de Identificación:" />
            <SelectBox v-model="copropietario.paisOrigen" :options="paisOrigen" label="País de Origen:" />
            <SelectBox v-model="copropietario.paisResidencia" :options="paisdeResidencia" label="País de Residencia:" />
            <SelectBox v-model="copropietario.departamento" :options="departamentos" label="Departamento" />
            <SelectBox v-model="copropietario.provincia" :options="provincias" label="Provincia:" />
            <SelectBox v-model="copropietario.distrito" :options="distritos" label="Distritos:" />
            <InputText v-model="copropietario.direccion" label="Dirección:" />
            <InputText v-model="copropietario.correo" label="Correo Electrónico:" />
            <SelectBox v-model="copropietario.prefijoTelefonico" :options="prefijoTelefonico" label="Número Telefónico:" />
            <InputText v-model="copropietario.numTelefonico" type="text" placeholder="Ingrese su número" />
          </div>

          <div class="buttons">
            <button type="button" @click="prevStep">Anterior</button>
            <button type="button" @click="nextStep">Siguiente</button>
          </div>
        </FormSection>

        <!-- Sección: Lotes -->
        <FormSection v-if="currentStep === 4" title="Lotes">
          <InputText
              v-model.number="formData.lotesAdquiridos"
              label="Lotes adquiridos"
              type="number"
              min="1"
              @change="actualizarLotes"
          />

          <div v-for="(lote, index) in formData.lotes" :key="index" class="lote-section">
            <h3>Lote {{ index + 1 }}</h3>

            <SelectBox
                v-model="lote.proyectolote"
                :options="proyectos"
                label="Proyecto:"
            />

            <SelectBox
                v-model="lote.ubicacionLote"
                :options="ubicacionesLote"
                label="Ubicación del Lote:"
            />

            <InputText v-model="lote.manzanalote" label="Manzana:" />

            <InputText v-model="lote.numeroLote" label="Número de Lote:" />

            <SelectBox
                v-model="lote.tipoContrato"
                :options="tiposContrato"
                label="Tipo de Contrato:"
            />

            <InputText
                v-model.number="lote.areaLote"
                label="Área del Lote (m²):"
                type="number"
                step="0.01"
            />

            <InputText
                v-model.number="lote.alicuota"
                label="Alicuota (%):"
                type="number"
                step="0.01"
                min="0"
                max="100"
            />

            <h4>Linderos:</h4>
            <InputText
                v-model.number="lote.derecha"
                label="Por la derecha (m):"
                type="number"
                step="0.01"
            />
            <InputText
                v-model.number="lote.izquierda"
                label="Por la izquierda (m):"
                type="number"
                step="0.01"
            />
            <InputText
                v-model.number="lote.frente"
                label="Por el frente (m):"
                type="number"
                step="0.01"
            />
            <InputText
                v-model.number="lote.fondo"
                label="Por el fondo (m):"
                type="number"
                step="0.01"
            />
          </div>

          <div class="buttons">
            <button type="button" @click="prevStep">Anterior</button>
            <button type="submit" class="submit-button">Registrar Cliente</button>
          </div>
        </FormSection>
      </form>

      <Summary v-if="mostrarResumen" :data="formData" />
    </div>
  </div>
</template><script>
import InputText from '@/components/Formularios/InputText.vue';
import SelectBox from '@/components/Formularios/SelectBox.vue';
import Button from '@/components/Formularios/Button.vue';
import Summary from '@/components/Formularios/Summary.vue';
import FormSection from '@/components/Formularios/FormSection.vue';

export default {
  components: { InputText, SelectBox, Button, Summary, FormSection },
  data() {
    return {
      currentStep: 1, // Paso actual del formulario
      formData: {
        nombreCliente: '',
        ocupacionCliente: '',
        tipoIdentificacion: '',
        numIdentificacionUsuario: '',
        paisOrigen: '',
        paisdeResidencia: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion: '',
        correoUsuario: '',
        prefijoTelefonico: '',
        numTelefonico: '',
        estadoCivil: '',

        // Datos del cónyuge (solo si es casado)
        nombreConyuge: '',
        ocupacionConyuge: '',
        tipoIdentificacionConyuge: '',
        numIdentificacionConyuge: '',
        paisOrigenConyuge: '',
        paisResidenciaConyuge: '',
        departamentoConyuge: '',
        provinciaConyuge: '',
        distritoConyuge: '',
        direccionConyuge: '',
        correoConyuge: '',
        prefijoTelefonicoConyuge: '',
        numTelefonicoConyuge: '',

        // Copropietarios
        numCopropietarios: 0,
        copropietarios: [],

        // Lotes
        lotesAdquiridos: 1,
        lotes: [{
          proyectolote: '',
          manzanalote: '',
          numeroLote: '',
          tipoContrato: '',
          areaLote: '',
          alicuota: '',
          derecha: null,
          izquierda: null,
          frente: null,
          fondo: null
        }]
      },

      mostrarResumen: false
    };
  },
  computed: {
    esCasado() {
      return this.formData.estadoCivil === 'Casado';
    },
    pasoAnterior() {
      return this.esCasado ? 2 : 1;
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
        // Si no es casado y estamos en paso 1, saltamos al paso 3 (copropietarios)
        if (this.currentStep === 2 && !this.esCasado) {
          this.currentStep = 3;
        }
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        // Si no es casado y estamos en paso 3, volvemos al paso 1
        if (this.currentStep === 2 && !this.esCasado) {
          this.currentStep = 1;
        }
      }
    },
    generarCopropietarios() {
      // Limpiar el array de copropietarios
      this.formData.copropietarios = [];

      // Generar nuevos copropietarios según el número especificado
      for (let i = 0; i < this.formData.numCopropietarios; i++) {
        this.formData.copropietarios.push({
          nombre: '',
          ocupacion: '',
          tipoIdentificacion: '',
          numIdentificacion: '',
          paisOrigen: '',
          paisResidencia: '',
          departamento: '',
          provincia: '',
          distrito: '',
          direccion: '',
          correo: '',
          prefijoTelefonico: '',
          numTelefonico: '',
          estadoCivil: ''
        });
      }
    },
    actualizarLotes() {
      const diferencia = this.formData.lotesAdquiridos - this.formData.lotes.length;

      if (diferencia > 0) {
        // Añadir lotes nuevos
        for (let i = 0; i < diferencia; i++) {
          this.formData.lotes.push({
            proyectolote: '',
            manzanalote: '',
            numeroLote: '',
            tipoContrato: '',
            areaLote: '',
            alicuota: '',
            derecha: '',
            izquierda: '',
            frente: '',
            fondo: ''
          });
        }
      } else if (diferencia < 0) {
        // Eliminar lotes sobrantes (manteniendo los datos existentes)
        this.formData.lotes = this.formData.lotes.slice(0, this.formData.lotesAdquiridos);
      }
    },
    enviarFormulario() {
      this.mostrarResumen = true;
      console.log("Formulario enviado:", this.formData);

      // Validación básica
      if (!this.validarFormulario()) {
        alert('Por favor complete todos los campos requeridos');
        return;
      }

      // Aquí iría la llamada API para guardar los datos
      // this.guardarDatos();
    },
    validarFormulario() {
      // Validación del cliente principal
      if (!this.formData.nombreCliente ||
          !this.formData.numIdentificacionUsuario ||
          !this.formData.correoUsuario) {
        return false;
      }

      // Validación del cónyuge si es casado
      if (this.esCasado) {
        if (!this.formData.nombreConyuge ||
            !this.formData.numIdentificacionConyuge) {
          return false;
        }
      }

      // Validación de copropietarios si existen
      if (this.formData.numCopropietarios > 0) {
        for (const coprop of this.formData.copropietarios) {
          if (!coprop.nombre || !coprop.numIdentificacion) {
            return false;
          }
        }
      }

      // Validación de lotes
      for (const lote of this.formData.lotes) {
        if (!lote.proyectolote ||
            !lote.manzanalote ||
            !lote.numeroLote ||
            !lote.tipoContrato) {
          return false;
        }
      }

      return true;
    }
  },
  mounted() {
    // Inicializar con un lote por defecto
    this.actualizarLotes();
  }
};
</script>

<style scoped>
.form-container {
  background-image: url("@/assets/Imagenes/FondoDashboard.jpg");
  background-size: cover; /* Cubre todo el fondo sin distorsionarse */
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Ocupa toda la altura de la pantalla */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  padding: 2rem; /* Espaciado interno */
  width: 100%; /* Usa todo el ancho disponible */
  margin-left: 153px; /* Deja espacio para el menú lateral */
  box-sizing: border-box; /* Incluye padding y border dentro del tamaño total */
  overflow: hidden;
}

/* Ajuste responsivo para pantallas pequeñas */
@media (max-width: 1024px) {
  .form-container {
    margin-left: 0; /* Elimina el margen del menú en pantallas pequeñas */
    width: 100%; /* Usa el ancho completo */
    padding: 1rem; /* Reduce el padding */
  }
}

.form-content {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

/* Título del formulario */
h2 {
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.6em;
}

/* Estilo del formulario */
.formulario {
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 80vh;
  overflow-y: auto;
}

/* Botón */
.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 14px 20px;
  font-size: 1.1em;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background-color: #0056b3;
  transform: scale(1.03);
}

/* Responsivo */
@media (max-width: 768px) {
  .form-container {
    align-items: flex-start;
    padding-top: 40px;
  }
  h2 {
    font-size: 1.4em;
  }
}
</style>
