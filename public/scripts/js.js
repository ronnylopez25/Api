async function cargarPersona() {
  try {
    const response = await fetch('/api/lista');
    const persona = await response.json();

    const tbody = document.getElementById('infoPersona');
    tbody.innerHTML = persona.map(persona => `
      <td>${persona.id_persona}</td>
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.cedula}</td>
      <td>
        <a href="#" class="btn-editar" data-id="${persona.id_persona}"><i class="fas fa-pen text-warning mx-1"></i></a>
        <a href="#" class="btn-eliminar" data-id="${persona.id_persona}"><i class="fas fa-trash text-danger mx-1"></i></a>
      </td>
    `).join('');

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    alert('Error al cargar datos');
  }
};

async function cargarEdicion(persona) {
  try {
    const response = await fetch('/api/lista');
    const persona = await response.json();

    persona.map(persona => {
      document.getElementById('txtNombre').value = persona.nombre;
      document.getElementById('txtApellido').value = persona.apellido;
      document.getElementById('txtDni').value = persona.cedula;
    }).join('');

  } catch (error) {
    console.error('Error al cargar datos:', error);
    alert('Error al cargar datos: ' + error.message);
  }
};

async function eliminarPersona(boton) {
  const id = boton.getAttribute('data-id');
  if (!id) return;

  if (!confirm('¿Estás seguro de eliminar esta persona?')) {
    return;
  }

  const response = await fetch(`/api/${id}`, {
    method: 'DELETE'
  });

  const result = await response.json();

  if (result.success) {
    alert('persona eliminada correctamente');
    boton.closest('tr').remove();
  } else {
    throw new Error(result.error || 'Error al eliminar');
  }
};


document.addEventListener('DOMContentLoaded', async () => {
  await cargarPersona();

  document.getElementById('infoPersona').addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-editar');
    console.log(boton);
    if (!boton) return;
    cargarEdicion(boton);
  });

  document.getElementById('infoPersona').addEventListener('click', (e) => {
    const boton = e.target.closest('.btn-eliminar');
    console.log(boton);
    if (!boton) return;
    eliminarPersona(boton);
  });
});