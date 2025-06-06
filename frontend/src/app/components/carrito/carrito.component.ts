import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/Carrito';
import { CarritoService, ItemCarrito } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carritos: Carrito[] = [];
  carrito = new Carrito();
  carritosNL: ItemCarrito[] = [];
  totalCarrito: number = 0;

  cantidadDisponible = 0;
  id = localStorage.getItem('id')
  constructor(private carritoService: CarritoService, private productoService: ProductoService, private ventaService: VentaService, private router: Router) {
    console.log("id", this.id)
    this.list();


  }
  ngOnInit(): void {
  }
  total() {
    if(this.id==null){
      this.totalCarrito= 0
      this.carritos.forEach(element => {
        this.totalCarrito+=element.cantidad*element.precio
      });
    }else{

      this.carritoService.totalCarrito(this.id).subscribe(
        (resusuario: any) => {
          this.totalCarrito = resusuario.precioTotal;
        },
        (err) => console.error(err)
      );
    }
  }

  decrementar() {
    if (this.carrito.cantidad <= 0.5)
      document.getElementById("decrementar")?.ariaDisabled;
    else {
      this.carrito.cantidad -= .5;
    }
  }
  aumentar() {
    if (this.carrito.cantidad >= this.cantidadDisponible)
      document.getElementById("incrementar")?.ariaDisabled;
    else {
      this.carrito.cantidad += .5;
    }

  }
  modificar() {

    if (this.carrito.cantidad < 0.5 || this.carrito.cantidad > this.cantidadDisponible) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      this.carritoService.modificarCarrito(this.carrito.cantidad, this.carrito.id).subscribe(
        (resusuario: any) => {
          $('#modalCantidad').modal('close');
          this.list()
        },
        (err) => console.error(err)
      );
    }
  }

  modificaCantidad(id: any) {
    this.carritoService.listOne(id).subscribe(
      (res: any) => {
        this.carrito = res;
        this.productoService.getCantidad(this.carrito.id_producto).subscribe(
          (res2: any) => {
            this.cantidadDisponible = res2.cantidad;
            console.log(res2.cantidad)
            $('#modalCantidad').modal();
            $("#modalCantidad").modal("open");
          },
          (err) => console.error(err)
        );
      },
      (err) => console.error(err)
    );
  }

  list() {
    if (this.id == null) {
      // this.carritosNL = this.carritoService.getItems()
      this.carritoService.getItems().forEach(element => {
        this.productoService.listOne(element.id_producto).subscribe(
          (res: any) => {
            let CarritoAux = {
              id: 0,
              id_producto: element.id_producto,
              id_usuario: 0,
              nombre: res.nombre, // si res tiene 'nombre'
              cantidad: element.cantidad,
              producto: res,
              precio: res.precio, // si res tiene 'precio'
              imagen_nombre: res.imagen_nombre
            };
            this.carritos.push(CarritoAux)
            this.totalCarrito+=CarritoAux.cantidad*CarritoAux.precio
          }
        )
        
      });
    } else {

      this.carritoService.listCarritoProducto(this.id).subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.total();
          
          //console.log(resusuario);
        },
        (err) => {
          console.error(err)
        }
      );
    }

  }
  compraCarrito() {
    if(this.id==null){
            Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Necesitas Iniciar Sesion para continuar",
      });
      
      this.router.navigateByUrl("login")
      return;
    }
    if (this.carritos.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tienes productos en tu carrito!",
      });
      return;
    }
    for (let i = 0; i < this.carritos.length; i++) {
      this.ventaService.crear(
        this.carritos[i].id_producto,
        localStorage.getItem('id'),
        this.carritos[i].cantidad * this.carritos[i].precio,
        this.carritos[i].cantidad
      ).subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.total();

          //console.log(resusuario);
        },
        (err) => console.error(err)
      );
    }
    for (let i = 0; i < this.carritos.length; i++) {
      this.carritoService.eliminar(this.carritos[i].id).subscribe(
        (resusuario: any) => {
          this.carritos = resusuario;
          console.log(resusuario);
          this.carritos = []

          //console.log(resusuario);
        },
        (err) => console.error(err)
      );
    }
    this.list()
  }

  eliminar(id_producto: any) {
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
        this.carritoService.eliminar(id_producto).subscribe(
          (resusuario: any) => {
            this.list()
          },
          (err) => console.error(err)
        );

        Swal.fire({
          title: 'Eliminado!',
          text: 'Tu carrito ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }
}
