<template>
  <div>
    <h1>Dashboard de Clientes</h1>
    <button @click="exportarExcel" class="export-button">Exportar a Excel</button>

    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th>Cliente N°</th>
          <th>Nombres y Apellidos</th>
          <th>Dirección</th>
          <th>Correo Electrónico</th>
          <th>Celular</th>
          <th>Identificación</th>
          <th>Número Identificación</th>
          <th>Estado Civil</th>
          <th>Ocupación</th>
          <th>Residencia</th>
          <th>Prefijo</th>
          <th>Departamento</th>
          <th>Provincia</th>
          <th>Distrito</th>
          <th>Nacionalidad</th>
          <th>Operario</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cliente, index) in clientes" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.nombresApellidos }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.correoElectronico }}</td>
          <td>{{ cliente.celularCliente }}</td>
          <td>{{ cliente.documentoIdentificacion }}</td>
          <td>{{ cliente.numeroIdentificacion }}</td>
          <td>{{ cliente.estadoCivil }}</td>
          <td>{{ cliente.ocupacion }}</td>
          <td>{{ cliente.residencia }}</td>
          <td>{{ cliente.prefijoPais }}</td>
          <td>{{ cliente.departamento }}</td>
          <td>{{ cliente.provincia }}</td>
          <td>{{ cliente.distrito }}</td>
          <td>{{ cliente.nacionalidad }}</td>
          <td>{{ cliente.operario }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import "@/assets/Tablas/Tablas.css";
import axios from "axios";
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      clientes: [],
    };
  },
  mounted() {
    this.obtenerClientes();
  },
  methods: {
    async obtenerClientes() {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const idOperario = userData ? userData.idOperario : null;
        console.log("ID Operario enviado en la solicitud:", idOperario);

        if (!idOperario) {
          console.error("No se encontró 'idOperario' en localStorage.");
          return;
        }

        const response = await axios.get(
            "https://backendcramirez.onrender.com/api/clientes/operario",
            {
              headers: {
                "Content-Type": "application/json",
                "X-User-ID": idOperario,
              },
              withCredentials: true,
            }
        );

        console.log("Clientes recibidos:", response.data);
        this.clientes = response.data;
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    },
    exportarExcel() {
      const ws = XLSX.utils.json_to_sheet(this.clientes);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Clientes");
      XLSX.writeFile(wb, "Clientes.xlsx");
    },
  },
};
</script>
<style scoped>
.export-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}

.export-button:hover {
  background-color: #45a049;
}
</style>