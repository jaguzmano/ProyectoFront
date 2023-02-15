import { Injectable } from '@angular/core';
//importar esta linea
import { HttpClient,HttpHandler } from '@angular/common/http';
// import { access } from 'fs';
@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  constructor(private https: HttpClient) { }

  public getProducto() {//no hay parametro 
    const url = `https://apisalida.azurewebsites.net/api/Productoes`
    return this.https.get(url)//get
  }
}
