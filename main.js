const Libros = [];
// Variable para controlar si el programa se sigue ejecutando
let running = true;

function generarId() {
  return Math.floor(Math.random() * 900000) + 100000;
}
// Funcion para agregar un libro al arreglo de libros
function agregarLibro(titulo, autor, año) {
  Libros.push({
    id: generarId(),
    titulo,
    autor,
    año,
    prestado: false,
    prestamoA: null
  });
}
// Funcion para que muestre todos los libros registrados
function listarLibros() {
  if (!Libros.length) {
    alert("No hay libros registrados.");
    return;
  }
  let msg = "ID | Título | Autor | Año | Prestado\n";
  Libros.forEach(lib =>
    msg += `${lib.id} | ${lib.titulo} | ${lib.autor} | ${lib.año} | ${lib.prestado ? "Sí" : "No"}\n`
  );
  alert(msg);
}

function buscarPorId(id) {
  if (!Libros.length) {
    alert("Aún no hay libros.");
    return -1;
  }
  const idx = Libros.findIndex(l => l.id === id);
  if (idx === -1) {
    alert("Libro no encontrado.");
  }
  return idx;
}

function prestarLibro(id, nombreUsuario) {
  const idx = buscarPorId(id);
  if (idx < 0) return;
  if (Libros[idx].prestado) {
    alert("Ese libro ya se prestó.");
    return;
  }
  Libros[idx].prestado = true;
  Libros[idx].prestamoA = nombreUsuario;
  alert(`Libro prestado a ${nombreUsuario}.`);
}

function devolverLibro(id) {
  const idx = buscarPorId(id);
  if (idx < 0) return;
  if (!Libros[idx].prestado) {
    alert("Ese libro no está prestado.");
    return;
  }
  Libros[idx].prestado = false;
  Libros[idx].prestamoA = null;
  alert("Libro devuelto.");
}
// Menu principal del programa
while (running) {
  const opcion = Number(prompt(
    "Simulador de Biblioteca:\n" +
    "1) Agregar libro\n" +
    "2) Listar libros\n" +
    "3) Prestar libro\n" +
    "4) Devolver libro\n" +
    "0) Salir"
  ));

  switch (opcion) {
    case 0:
      running = false;
      break;
    case 1:
    // Harry Potter 
      const t = prompt("Título del libro:");
    // J. K. Rowling
      const a = prompt("Autor:");
      const y = prompt("Año de publicación:");
     // 2001
      agregarLibro(t, a, y);
      break;
    case 2:
      listarLibros();
      break;
    case 3:
      const idP = Number(prompt("ID del libro a prestar:"));
      const usuario = prompt("Nombre del usuario:");
      prestarLibro(idP, usuario);
      break;
    case 4:
      const idD = Number(prompt("ID del libro a devolver:"));
      devolverLibro(idD);
      break;
    default:
      alert("Opcion no válida.");
  }
}

alert("Gracias por usar el Simulador de Biblioteca.");