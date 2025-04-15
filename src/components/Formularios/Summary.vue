<template>
  <div>
    <h3>Resumen</h3>
    <p><strong>Nombre:</strong> {{ data.nombre }}</p>
    <p><strong>Apellido:</strong> {{ data.apellido }}</p>
    <p><strong>País:</strong> {{ data.pais }}</p>
    <p><strong>Departamento:</strong> {{ data.departamento }}</p>
    <p><strong>Lotes adquiridos:</strong> {{ data.lotesAdquiridos }}</p>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>
