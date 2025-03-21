<template>
  <div class="dashboard-container">
    <header class="header">
      <div class="logo">
        <img src="/src/assets/imagenes/LogoCoram.png" alt="Grupo Coram Constructora" />
      </div>
      <nav class="nav-buttons">
        <router-link to="/clientes" class="nav-btn">MIS CLIENTES</router-link>
        <router-link to="/proyectos" class="nav-btn">PROYECTOS</router-link>
        <router-link to="/generador-de-contratos" class="nav-btn">GENERACION DE CONTRATOS</router-link>
        <router-link to="/asignador-carga-base" class="nav-btn">SUBIR BASE</router-link>
      </nav>
      <div class="user-icon">
        <img src="/src/assets/imagenes/ImgUser.png" alt="Usuario" />
      </div>
    </header>

    <!-- Buscador -->
    <div class="search-container">
      <input type="text" v-model="filtro" placeholder="Buscar por nombre o tipo de contrato..." />
    </div>

    <div class="table-container">
      <table class="client-table">
        <thead>
        <tr>
          <th>NOMBRES Y APELLIDOS</th>
          <th>LOTE</th>
          <th>COMPRADOR</th>
          <th>PROYECTO</th>
          <th>MZ-LT</th>
          <th>N° IDENTIF.</th>
          <th>TIPO DOC</th>
          <th>VENDEDOR</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
          <td>{{ cliente.vendedor }}</td>
          <td>{{ cliente.lote }}</td>
          <td>{{ cliente.comprador }}</td>
          <td>
            <a href="#" @click.prevent="mostrarDetalles(cliente.proyecto)">
              {{ cliente.proyecto }}
            </a>
          </td>
          <td>{{ cliente.mzLt }}</td>
          <td>{{ cliente.identificacion }}</td>
          <td>{{ cliente.tipoDoc }}</td>
          <td>{{ cliente.nombreCompleto }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="paginaActual === 1">⬅️</button>
      <button v-for="num in totalPaginas" :key="num" @click="cambiarPagina(num)" :class="{ active: num === paginaActual }">
        {{ num }}
      </button>
      <button @click="nextPage" :disabled="paginaActual === totalPaginas">➡️</button>
    </div>

    <div v-if="detalleVisible" class="detalle-proyecto">
      <h3>Detalles del Proyecto: {{ detallesProyecto.nombre }}</h3>
      <p><strong>Ubicación:</strong> {{ detallesProyecto.ubicacion }}</p>
      <p><strong>Área:</strong> {{ detallesProyecto.area }}</p>
      <p><strong>Precio:</strong> {{ detallesProyecto.precio }}</p>
      <p><strong>Estado:</strong> {{ detallesProyecto.estado }}</p>
      <p><strong>Fecha de Inicio:</strong> {{ detallesProyecto.fechaInicio }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtro: "",
      clientes: [...Array(30).keys()].map(i => ({
        id: i + 1,
        vendedor: ["Carlos Pérez", "Ana Gómez", "Luis Rodríguez", "María López", "Jorge Sánchez", "Elena Torres"][i % 6],
        lote: `L-${i + 1}`,
        comprador: ["Juan Torres", "Laura Fernández", "Miguel Castro", "Sofía Ramírez", "Pedro Jiménez", "Gabriela Márquez"][i % 6],
        proyecto: ["JUMEIRAH LAKE", "LAGOON VIEW", "SUNSET BAY", "OCEAN PARADISE"][i % 4],
        mzLt: `MZ-${i + 1}`,
        identificacion: `15299${356 + i}`,
        tipoDoc: "DNI",
        nombreCompleto: ["Pepe Ramírez", "Lucía Medina", "Ricardo Paredes", "Carmen Ortega", "Andrés Salazar", "Isabel Montes"][i % 6]
      })),
      detallesProyecto: {},
      detalleVisible: false,
      paginaActual: 1,
      clientesPorPagina: 10
    };
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.clientes.length / this.clientesPorPagina);
    },
    paginatedClientes() {
      const inicio = (this.paginaActual - 1) * this.clientesPorPagina;
      return this.clientes.slice(inicio, inicio + this.clientesPorPagina);
    },
    clientesFiltrados() {
      return this.paginatedClientes.filter(cliente =>
          cliente.nombreCompleto.toLowerCase().includes(this.filtro.toLowerCase()) ||
          cliente.identificacion.includes(this.filtro)
      );
    }
  },

  methods: {
    cambiarPagina(num) {
      this.paginaActual = num;
    },
    prevPage() {
      if (this.paginaActual > 1) this.paginaActual--;
    },
    nextPage() {
      if (this.paginaActual < this.totalPaginas) this.paginaActual++;
    },
    mostrarDetalles(proyecto) {
      this.detallesProyecto = {
        nombre: proyecto,
        ubicacion: ["Lima, Perú", "Arequipa, Perú", "Trujillo, Perú", "Cusco, Perú"][Math.floor(Math.random() * 4)],
        area: `${Math.floor(Math.random() * (500 - 100 + 1) + 100)}m²`,
        precio: `$${Math.floor(Math.random() * (300000 - 100000 + 1) + 100000)}`,
        estado: ["En construcción", "Finalizado", "Planificación", "Venta en curso"][Math.floor(Math.random() * 4)],
        fechaInicio: `${Math.floor(Math.random() * (30 - 1 + 1) + 1)}/0${Math.floor(Math.random() * 9) + 1}/202${Math.floor(Math.random() * 5)}`
      };
      this.detalleVisible = true;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
/* Estilo del buscador */
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
}
.search-container input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
}
.search-container input:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 5px rgba(30, 58, 138, 0.3);
}
.search-container::before {
  content: '🔍';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #666;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.logo img {
  height: 50px;
}
.user-icon img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.nav-buttons {
  display: flex;
  gap: 15px;
}
.nav-btn {
  background: linear-gradient(135deg, #34495e, #2c3e50);
  color: white;
  padding: 12px 24px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  }
.nav-btn:hover {
  background: #e63946;
}
  .detalle-proyecto {
    background: #f1f1f1;
    padding: 20px;
    border-radius: 10px;
    margin: 20px;
    border-left: 6px solid #1e3a8a;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  .detalle-proyecto h3 {
    color: #1e3a8a;
    font-size: 20px;
  }

  .table-container {
    width: 95%;
    margin: 20px auto;
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: white;
    padding: 15px;
  }
.client-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

  .client-table th {
    background: #2c3e50;
    color: white;
    text-align: left;
    padding: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .client-table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    color: #333;
  }
.client-table tbody tr {
  transition: background 0.3s ease-in-out;
}
  .client-table tbody tr:hover {
    background-color: #eef4ff;
    transform: scale(1.01);
  }

  .client-table a {
    color: #1e3a8a;
    text-decoration: none;
    font-weight: bold;
  }

  .client-table a:hover {
    color: #e63946;
    text-decoration: underline;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 8px;
  }

  .pagination button {
    background: #2c3e50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
    font-weight: bold;
  }

  .pagination button:hover {
    background-color: #e63946;
  }

  .pagination button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .pagination .active {
    background-color: #e63946;
  }

</style>
