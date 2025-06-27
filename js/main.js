// Este es un arreglo (lista) vacio que usaremos para guardar todos los libros que agreguemos.
// Es como si fuera la estanteria principal de la bibliotca.
const libros = [];
// Formulario completo para agregar un libro
const formAgregarLibro = document.getElementById('form-agregar-libro');
// Este es el campo donde elusuario escribe el título del libro.
const tituloInput = document.getElementById('titulo');
// Este es el campo donde el usuario escribe el autor del libro.
const autorInput = document.getElementById('autor');
// Este es el ccampo donde el usuario escribe el autor del libro
const anioInput = document.getElementById('anio');
// Este es el campo donde el usuario escribe el año de publicación del libro (Por ejemplo 2002)
const librosContainer = document.getElementById('libros-container');
// El contenedor donde se mostrarán todos los libros agregados.
const noLibrosMsg = document.getElementById('no-libros-msg');
// El mensaje que se muestra cuando no hay libros en la lista.
const idPrestarInput = document.getElementById('id-prestar');
// Este es el campo para el ID del libro a prestar.
const nombreUsuarioInput = document.getElementById('nombre-usuario');
// Nombre de usuario al que se presta el libro
const btnPrestar = document.getElementById('btn-prestar');
// Boton para ejecutar la accion de prestar un libro
const idDevolverInput = document.getElementById('id-devolver');
// El campo para el ID del libro a devolver.
const btnDevolver = document.getElementById('btn-devolver');
// El botón para ejecutar la acción de devolver un libro.
const mensajesDiv = document.getElementById('mensajes');
// Muestra mensajes temporales al usuario como "exito" "error" "advertencia"
function mostrarMensaje(msg, tipo = 'info') {
    mensajesDiv.innerHTML = `<p class="mensaje ${tipo}">${msg}</p>`;
    setTimeout(() => {
        mensajesDiv.innerHTML = '';
    }, 3000);
}
// Crea un nuevo objeto Libro y lo agrega al arreglo "libros".
function agregarLibro(titulo, autor, anio) {
    const nuevoLibro = new Libro(titulo, autor, anio);
    libros.push(nuevoLibro);
    mostrarMensaje(`"${titulo}" agregado correctamente. ID: ${nuevoLibro.id}`, 'success');
    listarLibrosEnDOM();
}
// Muestra toda la lista de libros en pantalla.
function listarLibrosEnDOM() {
    librosContainer.innerHTML = '';
    // Controla si se muestra en pantalla el mensaje "No hay libros"
    if (libros.length === 0) {
        noLibrosMsg.style.display = 'block';
        return;
    } else {
        noLibrosMsg.style.display = 'none';
    }
    // Itera sobre cada libro y crea su tarjeta HTML para mostrarla.
    libros.forEach(lib => {
        const libroCard = document.createElement('div');
        libroCard.classList.add('libro-card');
        libroCard.setAttribute('data-id', lib.id);
        // Crea el contenido de la tarjeta con la informacion del libro: título, autor, año, ID y si esta prestado o no.
        libroCard.innerHTML = `
            <h3>${lib.titulo}</h3>
            <p><strong>Autor:</strong> ${lib.autor}</p>
            <p><strong>Año:</strong> ${lib.anio}</p>
            <p><strong>ID:</strong> <span class="libro-id">${lib.id}</span></p>
            <p><strong>Estado:</strong> <span class="${lib.estaPrestado() ? 'prestado' : 'disponible'}">${lib.estaPrestado() ? `Prestado a: ${lib.prestamoA}` : 'Disponible'}</span></p>
        `;
        librosContainer.appendChild(libroCard);
    });
}
// Busca un libro en el arreglo "libros" por su ID.
function buscarPorId(id) {
    const libroEncontrado = libros.find(l => l.id === id);
    if (!libroEncontrado) {
        mostrarMensaje("Libro no encontrado.", 'error');
    }
    return libroEncontrado;
}
// Intenta prestar un libro por su ID al usuario especificado.
function prestarLibro(id, nombreUsuario) {
    const libroAPrestar = buscarPorId(id);
    if (!libroAPrestar) return;

    const prestadoExitosamente = libroAPrestar.prestar(nombreUsuario);
    if (prestadoExitosamente) {
        mostrarMensaje(`Libro "${libroAPrestar.titulo}" prestado a ${nombreUsuario}.`, 'success');
        listarLibrosEnDOM();
    } else {
        mostrarMensaje(`El libro "${libroAPrestar.titulo}" ya está prestado.`, 'warning');
    }
}
// Intenta devolver un libro por su ID.
function devolverLibro(id) {
    const libroADevolver = buscarPorId(id);
    if (!libroADevolver) return;

    const devueltoExitosamente = libroADevolver.devolver();
    if (devueltoExitosamente) {
        mostrarMensaje(`Libro "${libroADevolver.titulo}" devuelto.`, 'success');
        listarLibrosEnDOM();
    } else {
        mostrarMensaje(`El libro "${libroADevolver.titulo}" no está prestado.`, 'warning');
    }
}
// Maneja el envío del formulario para agregar un libro.
formAgregarLibro.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = tituloInput.value.trim();
    const autor = autorInput.value.trim();
    const anio = anioInput.value;

    if (titulo && autor && anio) {
        agregarLibro(titulo, autor, anio);
        formAgregarLibro.reset();
    } else {
        mostrarMensaje("Por favor, completa todos los campos para agregar un libro.", 'error');
    }
});

// Responde al clic en el botón para prestar el libro.
btnPrestar.addEventListener('click', () => {
    const id = parseInt(idPrestarInput.value);
    const usuario = nombreUsuarioInput.value.trim();

    if (isNaN(id) || !usuario) {
        mostrarMensaje("Por favor, ingresa un ID válido y el nombre de usuario.", 'error');
        return;
    }
    prestarLibro(id, usuario);
    idPrestarInput.value = '';
    nombreUsuarioInput.value = '';
});
// Maneja el clic en el boton para devolver un libro.
btnDevolver.addEventListener('click', () => {
    const id = parseInt(idDevolverInput.value);

    if (isNaN(id)) {
        mostrarMensaje("Por favor, ingresa un ID válido para devolver el libro.", 'error');
        return;
    }
    devolverLibro(id);
    idDevolverInput.value = '';
});

document.addEventListener('DOMContentLoaded', listarLibrosEnDOM);