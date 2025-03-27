<template>
  <div class="tabla-generar-contratos">
    <h2>Generar Contratos</h2>

    <!-- Buscador -->
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por número de contrato, proyecto, nombre o DNI..."
          class="search-input"
      />
    </div>

    <!-- Tabla -->
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>Tipo de Contrato</th>
          <th>Cliente Nº</th>
          <th>Contrato Nº</th>
          <th>Proyecto</th>
          <th>Empresa que Vende</th>
          <th>RUC Vendedor</th>
          <th>Dirección Vendedor</th>
          <th>Representante Legal - Vendedor</th>
          <th>DNI Vendedor</th>
          <th>Fecha de Firma de Contrato Definitivo</th>
          <th>Ubicación del Lote</th>
          <th>Nombres y Apellidos (Cliente)</th>
          <th>DNI (Cliente)</th>
          <th>Dirección - Comprador</th>
          <th>Correo Electrónico</th>
          <th>Celular</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="contrato in filteredContratos" :key="contrato.nroContrato">
          <td>{{ contrato.tipoContrato }}</td>
          <td>{{ contrato.clienteNro }}</td>
          <td>{{ contrato.nroContrato }}</td>
          <td>{{ contrato.proyecto }}</td>
          <td>{{ contrato.empresaVendedora }}</td>
          <td>{{ contrato.rucVendedor }}</td>
          <td>{{ contrato.direccionVendedor }}</td>
          <td>{{ contrato.representanteLegal }}</td>
          <td>{{ contrato.dniVendedor }}</td>
          <td>{{ contrato.fechaFirmaContrato }}</td>
          <td>{{ contrato.ubicacionLote }}</td>
          <td>{{ contrato.cliente.nombre }}</td>
          <td>{{ contrato.cliente.dni }}</td>
          <td>{{ contrato.cliente.direccion }}</td>
          <td>{{ contrato.cliente.correo }}</td>
          <td>{{ contrato.cliente.telefono }}</td>
          <td>
            <button @click="generarContrato(contrato)" class="generate-button">
              Generar Contrato
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "@/assets/Tablas/Tablas.css";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      searchQuery: "",
      contratos: [
        {
          tipoContrato: "Venta",
          clienteNro: "0001",
          nroContrato: "C001",
          proyecto: "Residencial Los Álamos",
          empresaVendedora: "Empresa ABC",
          rucVendedor: "12345678901",
          direccionVendedor: "Av. Comercial 123",
          representanteLegal: "Carlos Ramírez",
          dniVendedor: "11223344",
          fechaFirmaContrato: "10/03/2025",
          ubicacionLote: "Lote 12 - Manzana A",
          cliente: {
            nombre: "Juan Pérez",
            dni: "12345678",
            direccion: "Av. Siempre Viva 742",
            telefono: "987654321",
            correo: "juan.perez@example.com"
          }
        }
      ]
    };
  },
  computed: {
    filteredContratos() {
      return this.contratos.filter(contrato =>
          contrato.nroContrato.includes(this.searchQuery) ||
          contrato.cliente.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          contrato.cliente.dni.includes(this.searchQuery)
      );
    }
  },
  methods: {
    generarContrato(contrato) {
      this.generarWord(contrato);
    },

    async generarWord(contrato) {
      try {
        // Cargar la plantilla desde la carpeta `public`
        const response = await fetch("/api/auth/login");
        if (!response.ok) throw new Error("No se pudo cargar la plantilla");

        const blob = await response.blob();

        // Leer el contenido del archivo como ArrayBuffer
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onload = (event) => {
          try {
            const zip = new PizZip(event.target.result);
            const doc = new Docxtemplater(zip);

            // Reemplazar las variables en la plantilla con los datos del contrato
            doc.setData({
              CONTRATO_NRO: contrato.nroContrato,
              CLIENTE_NRO: contrato.clienteNro,
              TIPO_CONTRATO: contrato.tipoContrato,
              PROYECTO: contrato.proyecto,
              EMPRESA_VENDEDORA: contrato.empresaVendedora,
              RUC_VENDEDOR: contrato.rucVendedor,
              REPRESENTANTE_VENDEDOR: contrato.representanteLegal,
              DNI_VENDEDOR: contrato.dniVendedor,
              FECHA_FIRMA: contrato.fechaFirmaContrato,
              UBICACION_LOTE: contrato.ubicacionLote,
              CLIENTE_NOMBRE: contrato.cliente.nombre,
              CLIENTE_DNI: contrato.cliente.dni,
              CLIENTE_DIRECCION: contrato.cliente.direccion,
              CLIENTE_CORREO: contrato.cliente.correo,
              CLIENTE_TELEFONO: contrato.cliente.telefono
            });

            // Generar el documento final
            doc.render();
            const output = doc.getZip().generate({ type: "blob" });

            // Descargar el archivo Word
            saveAs(output, `Contrato_${contrato.nroContrato}.docx`);
          } catch (error) {
            console.error("Error al procesar la plantilla:", error);
          }
        };
      } catch (error) {
        console.error("Error al cargar la plantilla:", error);
      }
    }
  }
};
</script>


<style scoped>
/* Agrega tus estilos aquí */
</style>
