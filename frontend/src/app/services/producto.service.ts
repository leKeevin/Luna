import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class ProductoService {
constructor(private http: HttpClient) { }

list() {
  return this.http.get(`${environment.API_URI}/productos/showAll/`);
}

listOne(id: any){
  return this.http.get(`${environment.API_URI}/productos/listOne/${id}`);
}
crear(nombre: any, animal: any, precio:any, cantidad: any,descripcion:any){
  const nuevo ={
    "nombre":nombre,
    "animal":animal,
    "precio":precio,
    "cantidad":cantidad,
    "descripcion":descripcion    
  }
  return this.http.post(`${environment.API_URI}/productos/create`,nuevo);
}
actualizar(producto: any){
  return this.http.put(`${environment.API_URI}/productos/update/${producto.id}`,producto);

}
getCantidad(id: any){
  return this.http.get(`${environment.API_URI}/productos/getCantidad/${id}`);
}


getNombresProductos(){
  return this.http.get(`${environment.API_URI}/productos/getNombreProducto/`);
}
listTipo(tipo: any){
  return this.http.get(`${environment.API_URI}/productos/listTipo/${tipo}`);
}
getTipo(){
  return this.http.get(`${environment.API_URI}/productos/getTipo/`);
}
listMaterial(material: any){
  return this.http.get(`${environment.API_URI}/productos/listMateria;/${material}`);
}
getMaterial(){
  return this.http.get(`${environment.API_URI}/productos/getMaterial/`);
}

filtraprecio(n1: any, n2 : any){
  return this.http.post(`${environment.API_URI}/productos/filtraPrecio/`,{"valor1":n1,"valor2":n2});
}
eliminar(id: any){
  return this.http.delete(`${environment.API_URI}/productos/delete/${id}`);
}

}