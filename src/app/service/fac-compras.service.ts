import { Injectable } from '@angular/core';
//importar lo siguiente
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class FacComprasService {

  constructor(private http: HttpClient) { }

  public getFac_compras() {//no hay parametro 
  //const url = ` http://localhost:4000/mostrarfac_compras`
  const url = ` https://appdistribuidascompras.herokuapp.com/mostrarfac_compras` 
    return this.http.get(url)//get
  }
  public getFac_comprasid() {//no hay parametro 
    //const url = ` http://localhost:4000/mostrarid_compras`
    const url = ` https://appdistribuidascompras.herokuapp.com/mostrarfac_compras` 
      return this.http.get(url)//get
    }

  public getFac_compras_fcom_id() {//no hay parametro 
    // const url = ` http://localhost:4000/fac_compras_fcom_id`
    const url = ` https://appdistribuidascompras.herokuapp.com/fac_compras_fcom_id`
    return this.http.get(url)//get
  }
  public postFac_compras(body:any){ // objeto de entrada
    // const url= ` http://localhost:4000/fac_compras`
   const url= ` https://appdistribuidascompras.herokuapp.com/fac_compras`
    return this.http.post(url,body)//post
  }
  public putUpdateFac_compras(body:any){
    const url= ` https://appdistribuidascompras.herokuapp.com/fac_compras`
    return this.http.put(url,body)
  }
  public deleteFac_compras(name:any){ //parametro de entrada
    const url = ` https://appdistribuidascompras.herokuapp.com/fac_compras/`+name
    return this.http.delete(url)//delete
  }
  public getFac_compras_pro(name:any){ //parametro de entrada
    const url = ` https://appdistribuidascompras.herokuapp.com/fac_comprasPorProveedor/`+name
    return this.http.get(url)//get
  }
  public getFac_compras_id(name:any){ //parametro de entrada
   // const url = ` http://localhost:4000/fac_comprasPorId/:fcom_id/`+name
    const url = ` https://appdistribuidascompras.herokuapp.com/fac_comprasPorId/:fcom_id/`+name
    return this.http.get(url)//get
  }
  //Modulo Consumido
  /* public getFac_Pagadas() {//no hay parametro 
    const url = ` https://app-cuentasxpagarv10.herokuapp.com/listado`
    return this.http.get(url)//get
  }
  
  */

}
