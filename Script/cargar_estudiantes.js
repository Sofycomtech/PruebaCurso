/**
 * Función para cargar estudiantes desde un archivo JSON e inyectarlos en la grilla CSS.
 * Se ejecuta automáticamente al cargar el DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    cargarYRenderizarEstudiantes();
});

async function cargarYRenderizarEstudiantes() {
    // Referencia al contenedor del cuerpo de la tabla
    const tablaBody = document.querySelector('.grid-table-body');
    
    if (!tablaBody) {
        console.error('No se encontró el contenedor ".grid-table-body" en el HTML.');
        return;
    }

    try {
        // 1. Consumir el archivo JSON local
        const respuesta = await fetch('./Script/estudiantes.json');
        
        if (!respuesta.ok) {
            throw new Error(`Error al cargar el JSON: ${respuesta.status} ${respuesta.statusText}`);
        }
        
        const estudiantes = await respuesta.json();

        // Limpiar contenido estático previo si existiera
        tablaBody.innerHTML = '';

        // 2. Iterar sobre los datos y construir las filas dinámicamente
        estudiantes.forEach((estudiante, indice) => {
            // Crear el elemento contenedor de la fila
            const fila = document.createElement('div');
            fila.classList.add('grid-table-row');
            
            // Aplicar estilo cebra alternado de forma dinámica
            if (indice % 2 !== 0) {
                fila.classList.add('row-alt');
            }

            // Inyectar las celdas con la información correspondiente
            fila.innerHTML = `
                <div class="body-cell rut">${estudiante.rut}</div>
                <div class="body-cell">${estudiante.nombre}</div>
                <div class="body-cell">${estudiante.apellido}</div>
                <div class="body-cell">${estudiante.fechaNacimiento}</div>
                <div class="body-cell font-medium">${estudiante.carrera}</div>
                <div class="body-cell">${estudiante.sede}</div>
                <div class="body-cell">${estudiante.ciudad}</div>
            `;

            // Añadir la fila al cuerpo de la tabla
            tablaBody.appendChild(fila);
        });

        console.log(`Se cargaron exitosamente ${estudiantes.length} estudiantes.`);

    } catch (error) {
        console.error('Hubo un problema con la carga de datos:', error);
        tablaBody.innerHTML = `
            <div style="grid-column: span 7; padding: 20px; text-align: center; color: #ef4444; font-weight: 500;">
                Error al cargar el listado de alumnos. Intente nuevamente más tarde.
            </div>
        `;
    }
}