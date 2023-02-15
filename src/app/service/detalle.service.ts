import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(private http: HttpClient) { }

  public getDetalle() {//no hay parametro 
    const url = `http://localhost:4001/Detalle`
    return this.http.get(url)//get
  }

  public getDetallePorIdDetalle(id:any) {//no hay parametro 
    const url = `http://localhost:4001/DetallePorIdCabecera/`+id
    return this.http.get(url)//get
  }
  public postCreateDetalle(body:any){ // objeto de entrada
    const url= `http://localhost:4001/Detalle`
    return this.http.post(url,body)//post
  }
  public deleteDetalle(body:any){
    const url= `http://localhost:4001/Detalled`
    return this.http.put(url,body)
  }


}
