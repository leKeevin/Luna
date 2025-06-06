import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../services/producto.service';
import { Producto } from 'src/app/models/Producto';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  producto!: Producto;
  tipos: Tipo[] = [];
  aux !: any ;
  preciomin!: number;
  preciomax!:number
  cantidad = 0
  idCarrito=-1
  id:any = localStorage.getItem('id')
  zoomActivo: boolean = false;
  productosPorPagina = 10;
  paginaActual = 1;

   mostrarModal: boolean = false;  // Controlador del modal
  
  ngOnInit(): void {
    $(document).ready(function(){
      $('select').formSelect();
    }); 
  }

  constructor(private productoService: ProductoService, private carritoService: CarritoService, private router: Router) {
    // console.log("rol",this.rol)
    this.producto = new Producto();
    this.reiniciaVariables();
    this.list()
    this.getTipo()
  }

  alternarZoom() {
  this.zoomActivo = !this.zoomActivo;
}

  // Método para obtener los productos paginados
  get productosPaginados() {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return this.productos.slice(inicio, fin);
  }

  // Método para generar los números de páginas
  get paginas(): number[] {
    const total = this.totalPaginas;
    let paginas: number[] = [];
    const totalProductos = this.productos.length;
    const rango = Math.ceil(totalProductos / this.productosPorPagina);
   // const rango = 6; // Número máximo de botones de página

    // Establecer límites para las páginas que se deben mostrar
    let start = Math.max(1, this.paginaActual - Math.floor(rango / 2));
    let end = Math.min(total, start + rango - 1);

    // Ajustar la posición del "start" si estamos cerca del final
    if (this.paginaActual > total - Math.floor(rango / 2)) {
      start = Math.max(1, total - rango + 1);
      end = total;
    }

    for (let i = start; i <= end; i++) {
      paginas.push(i);
    }
    return paginas;
  }

  // Método para cambiar de página
  irPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  // Obtener el total de páginas
  get totalPaginas() {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  modal(producto:any){
   console.log(producto); // Ya tienes el producto, ahora solo lo asignamos
  this.producto = producto; // Asigna el producto al componente
 this.mostrarModal = true;
  }

  cerrarModal() {
  this.mostrarModal = false; // Cierra el modal
}


  nuevoProducto(){
    this.producto = new Producto()

      $('#modalNuevoProducto').modal();
      $("#modalNuevoProducto").modal("open");

  }
  guardaNuevoProducto(){
    this.productoService.crear(this.producto.nombre,this.producto.tipo,this.producto.precio,this.producto.cantidad,this.producto.descripcion)
    .subscribe((resusuario: any) =>
    {
    $('#modalNuevoProducto').modal('close');
      this.list();
    },
    err => console.error(err)
    );
    
    this.list();
  }

  agregaCarrito(producto_id:any){
    this.idCarrito = producto_id
    this.cantidad=1
    if(this.id ==null){
          this.carritoService.addItem({"id_producto":producto_id, "cantidad":this.cantidad});
    // console.log('Producto agregado:', producto);
    }else{
      this.carritoService.crear(this.cantidad, producto_id, this.id).subscribe((resUsuario:any)=>{
        
      })
    }
  }
  guardaCarrito(id_producto: any){
    let aux1:any = localStorage.getItem('id');
    let aux = parseInt(aux1) 
    this.carritoService.crear(this.cantidad,this.idCarrito,aux).subscribe((resUsuario:any)=>{
      this.producto = resUsuario;

    },
    err => console.log(err)
    );
  }

  modificaProducto(id:any){
    this.productoService.listOne(id).subscribe((resUsuario:any)=>{
      this.producto = resUsuario;
      $('#modalModificaProducto').modal();
      $("#modalModificaProducto").modal("open");
    },
    err => console.log(err)
    );


  }
  guardaModifica(){
    this.producto.tipo = this.producto.tipo.toLocaleLowerCase();
    this.productoService.actualizar(this.producto).subscribe((resusuario: any) =>
    {
    $('#modalModificaProducto').modal('close');
      this.list();
    },
    err => console.error(err)
    );
    
    this.list();
  }
  eliminaProducto(id_producto:any){

    Swal.fire({
      title: '¿Estás seguro bro?',
      text: 'No es posible revertir este!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list()
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu producto ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }
  eliminaFiltros(){
    this.reiniciaVariables()
    this.list()
  }
  reiniciaVariables(){
    this.aux=undefined;
    this.preciomin=0;
    this.preciomax= 500
    
  }
  list(){
    this.productoService.list().subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }
  getTipo(){
    this.productoService.getTipo().subscribe(
      (resusuario: any) => {
        this.tipos = resusuario;
        //console.log(resusuario);
        console.log(this.tipos);
      },
      (err) => console.error(err)
    );
  }
  filtraprecio(){
    this.productoService.filtraprecio(this.preciomin,this.preciomax).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(resusuario);
      },
      (err) => console.error(err)
    );
  }
  listTipo(){
    this.productoService.listTipo(this.aux).subscribe(
      (resusuario: any) => {
        this.productos = resusuario;
        //console.log(resusuario);
        console.log(this.productos);
      },
      (err) => console.error(err)
    );
  }

}

class Tipo{
  tipo: string;
  constructor(){
    this.tipo=''
  }

  
}

