// js/main.js

const libros = []; // Estante de libros.

// Conexiones al HTML.
const formAgregarLibro = document.getElementById('form-agregar-libro');
const tituloInput = document.getElementById('titulo');
const autorInput = document.getElementById('autor');
const anioInput = document.getElementById('anio');
const librosContainer = document.getElementById('libros-container');
const noLibrosMsg = document.getElementById('no-libros-msg');
const idPrestarInput = document.getElementById('id-prestar');
const nombreUsuarioInput = document.getElementById('nombre-usuario');
const btnPrestar = document.getElementById('btn-prestar');
const idDevolverInput = document.getElementById('id-devolver');
const btnDevolver = document.getElementById('btn-devolver');

// Muestra mensajes al usuario.
function mostrarMensaje(msg, tipo = 'info') {
    if (tipo === 'success' || tipo === 'warning' || tipo === 'info') {
        Toastify({
            text: msg,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor:
                tipo === 'success'
                    ? '#28a745'
                    : tipo === 'warning'
                        ? '#ffc107'
                        : '#17a2b8',
            stopOnFocus: true,
        }).showToast();
    } else if (tipo === 'error') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: msg,
        });
    }
}

// Agrega y muestra un libro.
function agregarLibro(titulo, autor, anio) {
    const nuevoLibro = new Libro(titulo, autor, anio);
    libros.push(nuevoLibro);
    mostrarMensaje(`"${titulo}" agregado. ID: ${nuevoLibro.id}`, 'success');
    listarLibrosEnDOM();
}

// Dibuja los libros en la pagina.
function listarLibrosEnDOM() {
    librosContainer.innerHTML = '';
    if (libros.length === 0) {
        noLibrosMsg.style.display = 'block';
        return;
    } else {
        noLibrosMsg.style.display = 'none';
    }

    libros.forEach(lib => {
        const libroCard = document.createElement('div');
        libroCard.classList.add('libro-card');
        libroCard.setAttribute('data-id', lib.id);

        libroCard.innerHTML = `
            <h3>${lib.titulo}</h3>
            <p><strong>Autor:</strong> ${lib.autor}</p>
            <p><strong>Año:</strong> ${lib.anio}</p>
            <p><strong>ID:</strong> <span class="libro-id">${lib.id}</span></p>
            <p><strong>Estado:</strong> 
                <span class="${lib.estaPrestado() ? 'prestado' : 'disponible'}">
                    ${lib.estaPrestado() ? `Prestado a: ${lib.prestamoA}` : 'Disponible'}
                </span>
            </p>
        `;
        librosContainer.appendChild(libroCard);
    });
}

// Busca libro por ID.
function buscarPorId(id) {
    const libroEncontrado = libros.find(l => l.id === id);
    if (!libroEncontrado) {
        mostrarMensaje("Libro no encontrado.", 'error');
    }
    return libroEncontrado;
}

// Presta un libro.
function prestarLibro(id, nombreUsuario) {
    const libroAPrestar = buscarPorId(id);
    if (!libroAPrestar) return;

    const exito = libroAPrestar.prestar(nombreUsuario);
    if (exito) {
        mostrarMensaje(`Libro "${libroAPrestar.titulo}" prestado a ${nombreUsuario}.`, 'success');
        listarLibrosEnDOM();
    } else {
        mostrarMensaje(`El libro "${libroAPrestar.titulo}" (ID: ${id}) ya esta prestado.`, 'warning');
    }
}

// Devuelve un libro.
function devolverLibro(id) {
    const libroADevolver = buscarPorId(id);
    if (!libroADevolver) return;

    const exito = libroADevolver.devolver();
    if (exito) {
        mostrarMensaje(`Libro "${libroADevolver.titulo}" devuelto.`, 'success');
        listarLibrosEnDOM();
    } else {
        mostrarMensaje(`El libro "${libroADevolver.titulo}" (ID: ${id}) no esta prestado.`, 'warning');
    }
}

// --- Eventos (lo que hace el usuario) ---

// Al enviar formulario de agregar.
formAgregarLibro.addEventListener('submit', e => {
    e.preventDefault();
    const titulo = tituloInput.value.trim();
    const autor = autorInput.value.trim();
    const anio = parseInt(anioInput.value);

    if (titulo && autor && !isNaN(anio) && anio >= 1000 && anio <= 2025) {
        agregarLibro(titulo, autor, anio);
        formAgregarLibro.reset();
    } else {
        mostrarMensaje("Completa los campos correctamente.", 'error');
    }
});

// Al clic en prestar.
btnPrestar.addEventListener('click', () => {
    const id = parseInt(idPrestarInput.value);
    const usuario = nombreUsuarioInput.value.trim();

    if (isNaN(id) || !usuario) {
        mostrarMensaje("Falta ID o nombre de usuario.", 'error');
        return;
    }
    prestarLibro(id, usuario);
    idPrestarInput.value = '';
    nombreUsuarioInput.value = '';
});

// Al clic en devolver.
btnDevolver.addEventListener('click', () => {
    const id = parseInt(idDevolverInput.value);

    if (isNaN(id)) {
        mostrarMensaje("Falta ID para devolver.", 'error');
        return;
    }
    devolverLibro(id);
    idDevolverInput.value = '';
});

// --- Carga inicial de libros ---
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./libros.json');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        // console.log('Libros cargados:', data);

        data.forEach(libroData => {
            const nuevoLibro = new Libro(libroData.titulo, libroData.autor, libroData.anio);
            
            if (libroData.id) {
                nuevoLibro.id = libroData.id;
            }

            if (libroData.prestado && libroData.prestamoA) {
                nuevoLibro.prestar(libroData.prestamoA);
            }
            libros.push(nuevoLibro);
        });
        
        listarLibrosEnDOM();

    } catch (error) {
        console.error('Problema al cargar libros.json:', error);
        Swal.fire({
            title: "Error al cargar libros",
            text: `No se cargaron los datos iniciales. Error: ${error.message}`,
            icon: "error",
            footer: 'Asegurate que "libros.json" y el servidor esten OK.'
        });
        if (libros.length === 0) {
            noLibrosMsg.style.display = 'block';
        }
    }
});