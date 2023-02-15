import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjDetService {

  constructor(private http: HttpClient) { }

  public getObjDet() {//no hay parametro 
    const url = `http://localhost:4001/ObjDet`
    return this.http.get(url)//get
  }
  public postCreateObjDet(body:any){ // objeto de entrada
    const url= `http://localhost:4001/ObjDet`
    return this.http.post(url,body)//post
  }
  public deleteObjDet(body:any){ //parametro de entrada
    const url = `http://localhost:4001/ObjDetd`
    return this.http.put(url,body)//delete
  }
  public putUpdateObjDet(body:any){
    const url= `http://localhost:4001/ObjDet`
    return this.http.put(url,body)
  }
}
