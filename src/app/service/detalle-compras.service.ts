import { Injectable } from '@angular/core';
//importar lo siguiente
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DetalleComprasService {

  constructor(private http: HttpClient) { }

  public getDetalle_compras() {//no hay parametro 
    //const url = `http://localhost:4000/detalle_compras`
    const url = `https://appdistribuidascompras.herokuapp.com/detalle_compras`
    return this.http.get(url)//get
  }
  public postDetalle_compras(body:any){ // objeto de entrada
    //const url= `http://localhost:4000/nuevodetalle_compras`
   const url= `https://appdistribuidascompras.herokuapp.com/nuevodetalle_compras`
    return this.http.post(url,body)//post
  }
  public getDetallePorNameDetalle(name:any) {//no hay parametro 
   // const url = `http://localhost:4000/detalle_compras/`+name
    const url = `https://appdistribuidascompras.herokuapp.com/detalle_compras/`+name
    return this.http.get(url)//get
  }
  /*
  public putUpdateDetalle_compras(body:any){
    const url= ` https://modelo-223.herokuapp.com/detalle_compras`
    return this.http.put(url,body)
  }
  */
  public deleteDetalle_compras(body:any){ //parametro de entrada
    // const url = `http://localhost:4000/detalle_compras`
    const url = ` https://appdistribuidascompras.herokuapp.com/detalle_compras`
    return this.http.delete(url,body)//delete
  }
}
