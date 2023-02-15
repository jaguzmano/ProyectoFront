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
  selector: 'app-obj-det',
  templateUrl: './obj-det.component.html',
  styleUrls: ['./obj-det.component.css']
})
export class ObjDetComponent implements OnInit {
  public form!:FormGroup;
  public objDets:ModelObjDet[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private objDetService:ObjDetService
  ) { }

  ngOnInit(): void {
    this.cargarObjDet()

    this.form=this.formBuilder.group({
     txtaut_tipo:[''], 
    txtaut_modelo:[''],
    txtaut_anio_fabricacion:[''],
    txtaut_cilindraje:[''], 
    txtaut_precio:[''],
      
    })


  }
  public cargarObjDet(){
    this.objDetService.getObjDet().subscribe(
      (objDet:any)=>{
        this.objDets=objDet
        console.log(this.objDets)
      },(error)=>console.log(error)
    )
  }
  //Crear cliente
  public crearObjDet(){
    this.objDetService.postCreateObjDet({
    aut_tipo:this.form.value.txtaut_tipo, 
    aut_modelo:this.form.value.txtaut_modelo,
    aut_anio_fabricacion:this.form.value.txtaut_anio_fabricacion,
    aut_cilindraje:this.form.value.txtaut_cilindraje, 
    aut_precio:this.form.value.txtaut_precio,


    }).subscribe(
      respuesta=>{
        console.log(' creada correctamente');
        this.form.reset()
        this.cargarObjDet();
      }
    )
  }

}
