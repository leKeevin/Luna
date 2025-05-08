export class Producto{
    id: number;
    nombre : string;
    tipo: string;
    precio: number;
    cantidad: number;
    descripcion: string;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.tipo = '';
        this.precio = 0;
        this.cantidad = 0;
        this.descripcion = '';
    }
}