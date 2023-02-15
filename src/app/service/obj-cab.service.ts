import { Injectable } from '@angular/core';
import { HttpClient,HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjCabService {

  constructor(private http: HttpClient) { }

  public getObjCab() {//no hay parametro 
    const url = `http://localhost:4001/ObjCab`
    return this.http.get(url)//get
  }
  public getObjCabById(id:any) {//no hay parametro 
    const url = `http://localhost:4001/ObjCabById/`+id
    return this.http.get(url)//get
  }
  public postCreateObjCab(body:any){ // objeto de entrada
    const url= `http://localhost:4001/ObjCab`
    return this.http.post(url,body)//post
  }
  public deleteObjCab(body:any){ //parametro de entrada
    const url = `http://localhost:4001/ObjCabd`
    return this.http.put(url,body)//delete
  }
  public putUpdateObjCab(body:any){
    const url= `http://localhost:4001/ObjCab`
    return this.http.put(url,body)
  }

}
