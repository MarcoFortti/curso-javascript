// js/Libro.js

class Libro {
    constructor(titulo, autor, anio) {
        this.id = Libro.generarId(); // Crea un ID aleatorio
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.prestado = false; // Arranca como disponible
        this.prestamoA = null; // Nadie lo tiene aún
    }

    static generarId() {
        return Math.floor(Math.random() * 900000) + 100000; // Número de 6 cifras
    }

    prestar(nombreUsuario) {
        if (this.prestado) return false; // Ya esta en uso
        this.prestado = true;
        this.prestamoA = nombreUsuario;
        return true; // Prestamo ok
    }

    devolver() {
        if (!this.prestado) return false; // No se puede devolver lo que no se presto
        this.prestado = false;
        this.prestamoA = null;
        return true; // Devolucion ok
    }

    estaPrestado() {
        return this.prestado; // Simplemente dice si está prestado
    }
}
