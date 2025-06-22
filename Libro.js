class Libro {
	constructor(titulo, autor, año) {
		this.id = Libro.generarId();
		this.titulo = titulo;
		this.autor = autor;
		this.año = año;
		this.prestado = false;
		this.prestamoA = null;
	}


	static generarId() {
		return Math.floor(Math.random() * 900000) + 100000;
	}


	prestar(nombreUsuario) {
		if (this.prestado) {
			alert("Ese libro ya se prestó.");
			return false;
		}
		this.prestado = true;
		this.prestamoA = nombreUsuario;
		alert(`Libro prestado a ${nombreUsuario}.`);
		return true;
	}


	devolver() {
		if (!this.prestado) {
			alert("Ese libro no está prestado.");
			return false;
		}
		this.prestado = false;
		this.prestamoA = null;
		alert("Libro devuelto.");
		return true;
	}

	mostrarInfo() {
		return `${this.id} | ${this.titulo} | ${this.autor} | ${this.año} | ${this.prestado ? "Sí" : "No"}`;
	}


	estaPrestado() {
		return this.prestado;
	}
}
