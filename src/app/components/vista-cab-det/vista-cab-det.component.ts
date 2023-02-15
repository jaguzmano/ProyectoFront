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

@Component({
  selector: 'app-vista-cab-det',
  templateUrl: './vista-cab-det.component.html',
  styleUrls: ['./vista-cab-det.component.css']
})
export class VistaCabDetComponent implements OnInit {
//****inializamos las importaciones realizadas menos el model
  constructor(
     
    public route: ActivatedRoute,
    private detalleService:DetalleService,
    private objCabService:ObjCabService,
  ) { }
  //****fin  */
  //---Crear variable ModelCabecera para almacenar datos-----
  public form!:FormGroup;
  public cabeceras:ModelCabecera[]=[]
  public detalles:ModelDetalle[]=[]
  public objCabs:ModelObjCab[]=[]
  //Variables entrantes temporales
  public cli_codigo!:number
  public com_codigo!:number
  //variables temporales propias
  //---fin
   //______Inicalizar datos para html_______________//
  ngOnInit(): void {
    
    //parametros de entrada
    this.route.params.subscribe(
      params=>{
        
        this.cli_codigo=parseInt(params['cli_codigo']);
        this.com_codigo=parseInt(params['com_codigo']);
        console.log(this.cli_codigo);
        console.log(this.com_codigo);
      }
    )
    this.cargarObjCab()
    this.cargarDetalle()

  }
  //______________FIN_____________

  //°°°°°°°°°°°°| Crear Metodos de Detalle|°°°°°°°°°°°°°°°°°°°°°°°°°°°
  //--metodo buscar ObjCab(cliente)
  public cargarObjCab(){
    console.log("Hola--objcab");
    console.log(this.cli_codigo);
    this.objCabService.getObjCabById(this.cli_codigo).subscribe(
    (objCab:any)=>{
      this.objCabs=objCab
      console.log("Hchauu");
      console.log(this.objCabs);
    }, (error) => console.log(error)

    )
  }
  //----metodo para buscar detalles de cabecera(factura)
  public cargarDetalle(){
    console.log("ALOO---Detalle");
    console.log(this.com_codigo);
    this.detalleService.getDetallePorIdDetalle(this.com_codigo).subscribe(
    (detalle:any)=>{
      this.detalles=detalle
      console.log("ALppps");
      console.log(this.detalles);
      console.log("ALOOOOs");
    }, (error) => console.log(error)

    )
  }

}
