import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  public getMarca() {//no hay parametro 
    const url = `http://localhost:4001/Marca`
    return this.http.get(url)//get
  }
}
