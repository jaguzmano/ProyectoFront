import { Component, OnInit } from '@angular/core';

//Importar el router para transdar datos en html
import { Router } from '@angular/router';
//Importamos form... para recoger los datos de html
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
//Importamos el ModelCabecera para manipular datos
import { ModelCabecera } from 'src/app/model/model.cabecera';
//Importamos los CabeceraService para manipular metodos 
import { CabeceraService } from 'src/app/service/cabecera.service';
//Importamos ObjCabService para utilizar los metodos 
import { ObjCabService } from 'src/app/service/obj-cab.service';
//Importamos ModelObjCab para almacenar datis para el objeto cabecera
import { ModelObjCab } from 'src/app/model/model.objCab';
//Importamos detalleService para manipular metodos
import { DetalleService } from 'src/app/service/detalle.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

//****inializamos las importaciones realizadas menos el model 
  constructor(
    private formBuilder:FormBuilder, 
    public router: Router,
    private cabeceraService:CabeceraService,
    private objCabService:ObjCabService,
    private detalleService:DetalleService
  ) { }
//****fin  */

//---Crear variable ModelCabecera para almacenar datos
    cabeceras: ModelCabecera[]=[]
    public form! : FormGroup
    objCabs:ModelObjCab[]=[]
    //Variables temporales
    objCab:any
    cabecera:any
    
//---fin

//______Inicalizar datos para html_______________//

  ngOnInit(): void {
    this.cargarCabeceraNombre();
    this.cargarObjCab()
    //form... del html
    this.form=this.formBuilder.group({
        txtfact_numero:[''],
        txtfac_tarifa0:-1,
        txtfac_tarifa12:-1,
        txtfac_iva:-1,
        objCabSelected:[''],

    });
    //definir la variable tempral cabecera
    this.cabecera={
      cli_id:-1,
      fact_numero:"",
      fac_tarifa0:-1,
      fac_tarifa12:-1,
      fac_iva:-1,
    }
  }
//______________FIN_____________
//°°°°°°°°°°°°| Crear Metodos de Cabecera |°°°°°°°
//----cargar cabecera---

public cargarCabecera(){
  this.cabeceraService.getCabecera(0).subscribe(
    (cabecera:any)=>{
      this.cabeceras=cabecera
      console.log(this.cabeceras)
    },(error)=>console.log(error)
  )
}
public cargarCabeceraNombre(){
  this.cabeceraService.getCabeceraNombre().subscribe(
    (cabecera:any)=>{
      this.cabeceras=cabecera
      console.log(this.cabeceras)
    },(error)=>console.log(error)
  )
}

//cargar ObjCab .--> Clientes para la Factura cabecera
public cargarObjCab(){
  this.objCabService.getObjCab().subscribe(
    (objCab:any)=>{
      this. objCabs= objCab
      console.log(this.objCabs)
    },(error)=>console.log(error)
  )
}

 //_____________*--------Creacion Cabecera Temporal--------*________
 public crearCabecera(){
  this.cabecera={
    cli_codigo:this.form.value.objCabSelected,
    
  };

}
 //_____________*--------Eliminar una Cabecera--------*________
 public eliminarCabecera(id:any){   
  this.cabeceraService.deleteCabecera({
    id:id
  }).subscribe(
    respuesta=>{
      console.log('eliminada correctamente');
      this.cargarCabeceraNombre()
    }
  )
}




}
