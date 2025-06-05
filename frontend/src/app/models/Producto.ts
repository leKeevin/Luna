export class Producto{
    id: number;
    tipo: string;
    nombre : string;
    precio: number;
    cantidad: number;
    material: string;
    descripcion: string;
    imagen_nombre: string;
    
    constructor() {
        this.id = 0;
        this.tipo = '';
        this.nombre = '';
        this.precio = 0;
        this.cantidad = 0;
        this.material = '';
        this.descripcion = '';
        this.imagen_nombre = '';
    }
}