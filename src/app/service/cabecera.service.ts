import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CabeceraService {

  constructor(private http: HttpClient) { }
  public getCabecera(id:any) {//no hay parametro 
    const url = `http://localhost:4001/Cabecera/`+id
    return this.http.get(url)//get
  }
  public getCabeceraNombre() {//no hay parametro 
    const url = `http://localhost:4001/CabeceraNombre`
    return this.http.get(url)//get
  }

  public postCreateCabecera(body:any){ // objeto de entrada
    const url= `http://localhost:4001/Cabecera`
    return this.http.post(url,body)//post
  }
  public deleteCabecera(body:any){
    const url= `http://localhost:4001/Cabecerad`
    return this.http.put(url,body)
  }
  public putUpdateCabecera(body:any){
    const url= `http://localhost:4001/Cabecera`
    return this.http.put(url,body)
  }

}
