class Libro {
    constructor(titulo, autor, anio) {
        this.id = Libro.generarId();
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.prestado = false;
        this.prestamoA = null;
    }

    static generarId() {
        return Math.floor(Math.random() * 900000) + 100000;
    }

    prestar(nombreUsuario) {
        if (this.prestado) {
            return false;
        }
        this.prestado = true;
        this.prestamoA = nombreUsuario;
        return true;
    }

    devolver() {
        if (!this.prestado) {
            return false;
        }
        this.prestado = false;
        this.prestamoA = null;
        return true;
    }

    mostrarInfo() {
        return `${this.id} | ${this.titulo} | ${this.autor} | ${this.anio} | ${this.prestado ? "Sí" : "No"}`;
    }

    estaPrestado() {
        return this.prestado;
    }
}