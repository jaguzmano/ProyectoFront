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

//ADICIONAL 
// importar el roter para los datos extraidos de otro html
import { ActivatedRoute } from '@angular/router';
//Importamos ModelObjDet para almacenar datos
import { ModelObjDet } from 'src/app/model/model.objDet';
//Importamos ObjDetService para manipular los metodo del producto
import { ObjDetService } from 'src/app/service/obj-det.service';
//importamos ModelDetalle para almacenar datos  de los producto escogidos
import { ModelDetalle } from 'src/app/model/model.detalle';
//importamos DetalleService para manipular los metodos
import { DetalleService } from 'src/app/service/detalle.service';
import { MarcaService } from 'src/app/service/marca.service';
import { ModelMarca } from 'src/app/model/model.marca';

@Component({
  selector: 'app-obj-cab',
  templateUrl: './obj-cab.component.html',
  styleUrls: ['./obj-cab.component.css']
})
export class ObjCabComponent implements OnInit {
  public form!:FormGroup;
  public objCabs:ModelObjCab[]=[]

  public informacionObjCab={
    cli_codigo:-1,
      cli_nombres:"",
      cli_direccion:"",
      cli_telefono:"",

  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private objCabService:ObjCabService

  ) { }

  ngOnInit(): void {
    this.cargarObjCab()
    
    
    this.form=this.formBuilder.group({
      txtcli_identificacion:[''],
      txtcli_nombres:[''],
      txtcli_direccion:[''],
      txtcli_telefono:[''],
      txtcli_fecha_nacimiento: ['']
      
    })
  }
  //Cargar Teams
  public cargarObjCab(){
    this.objCabService.getObjCab().subscribe(
      (objCab:any)=>{
        this.objCabs=objCab
        console.log(this.objCabs)
      },(error)=>console.log(error)
    )
  }
   //Crear cliente
   public crearObjCab(){
    this.objCabService.postCreateObjCab({
      cli_identificacion:this.form.value.txtcli_nombres,
      cli_nombres:this.form.value.txtcli_nombres,
      cli_direccion:this.form.value.txtcli_direccion,
      cli_telefono:this.form.value.txtcli_telefono,  
      cli_fecha_nacimiento:this.form.value.txtcli_fecha_nacimiento

    }).subscribe(
      respuesta=>{
        console.log('Teams creada correctamente');
        this.form.reset()
        this.cargarObjCab();
      }
    )
  }
  public eliminarObjCab(id:any){   
    this.objCabService.deleteObjCab({
      id:id
    }).subscribe(
      respuesta=>{
        console.log('Teams eliminada correctamente');
        this.cargarObjCab()
      }
    )
  }
  public infoUpdateObjCab(cli_codigo:any, cli_nombres:any, cli_direccion:any, cli_telefono:any){
    this.informacionObjCab.cli_codigo=cli_codigo,
    this.informacionObjCab.cli_nombres=cli_nombres,
    this.informacionObjCab.cli_direccion=cli_direccion,
    this.informacionObjCab.cli_telefono=cli_telefono
   
  }
  public actualizarObjCab(cli_codigo:any){
    this.objCabService.putUpdateObjCab({

      cli_codigo:cli_codigo,
      cli_nombres:this.form.value.txtcli_nombres,
      cli_direccion:this.form.value.txtcli_direccion,
      cli_telefono:this.form.value.txtcli_telefono,
     
    }).subscribe(
      respuesta=>{
        console.log('ObjCabactualizada correctamente');
        this.form.reset()
        this.cargarObjCab()
      }
    )
  }

}
