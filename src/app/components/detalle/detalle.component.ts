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
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
//****inializamos las importaciones realizadas menos el model
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private objDetService:ObjDetService,
    private cabeceraService:CabeceraService,
    private detalleService:DetalleService,
    private marcaService: MarcaService
  ) { }
  //****fin  */
  //---Crear variable ModelCabecera para almacenar datos
    objDets:ModelObjDet[]=[]
    public form!:FormGroup;
    detalles:ModelDetalle[]=[]
    marcas:ModelMarca[]=[]
    
    //Variables entrantes temporales
    cli_codigo!:number;
    
    //variables temporales propias
    objDet: any
    fecha:any
    marca:any
    detalle:any
    public txtTotal: number=0;

    
    
  //---fin
  //______Inicalizar datos para html_______________//
  ngOnInit(): void {
    this.fecha=new Date()
    this.cargarObjDet()
    this.cargarMarca()

    //parametros de entrada
    this.route.params.subscribe(
      params=>{
        this.cli_codigo=parseInt(params['cli_codigo']);
        
      }
    )
    //datos recogios del html
    this.form = this.formBuilder.group({
      objDetSelected:[null,[Validators.required]],
      marcaSelected:[null,[Validators.required]],
      txtcantidad:['',[Validators.required]],
    })
    //form... del html
  }
  //______________FIN_____________

  //°°°°°°°°°°°°| Crear Metodos de Detalle|°°°°°°°
  public cargarObjDet() {
    this.objDetService.getObjDet().subscribe(
      (objDet: any) => {
        this.objDets = objDet
        console.log(this.objDets);
      }, (error) => console.log(error)
    )
  }
  public cargarMarca() {
    this.marcaService.getMarca().subscribe(
      (marca: any) => {
        this.marcas = marca
        console.log(this.marcas);
      }, (error) => console.log(error)
    )
  }
  get marcaSelected(){
    return this.form.get('marcaSelected');
  }
  public agregarMarca(){
    this.marca=this.marcaSelected?.value;
  }

  //coger el objeto ObjDet(prouctos) 
  get objDetSelected(){
    return this.form.get('objDetSelected');
  }
  public agregarObjDet(){
    this.objDet=this.objDetSelected?.value;
  }
  //Agregar objDet(producto) escogido a un arreglo
  public agregarDetalle(){
    /**
     *                det_com_codigo:Number,
                        com_codigo:Number,
                        mar_codigo:Number,

                        aut_codigo:Number,
                        det_com_cantidad:Number,
                        det_com_precio_total:Number,
                        det_com_estado:Boolean,
                        aut_modelo:String
     */
    let  cantidad =parseInt(this.form.value.txtcantidad==undefined?1:this.form.value.txtcantidad);
    
    let precioAuto = this.objDet.aut_precio;
    
    let total =  precioAuto*cantidad;
    this.detalle={

      mar_codigo:this.marca.mar_codigo,
      aut_codigo:this.objDet.aut_codigo,
      det_com_cantidad:cantidad,
      det_com_precio_total:total,
      aut_precio:this.objDet.aut_precio,
      mar_nombre:this.marca.mar_nombre,
      aut_modelo:this.objDet.aut_modelo
    };
    this.txtTotal+=this.detalle.det_com_precio_total;
    this.detalles.push(this.detalle)

  }
  //_____*--Quitar el Ojeto  escogido al detalles --*____________
  
public quitarDetalle(detalle:any){
  this.detalles.map((det)=>{});
  this.detalles=[
    ...this.detalles.filter((det)=>det.aut_codigo!==detalle.aut_codigo),
    
  ];
}

//_____*-- Ingreso de Mestro detale a la base de datos --*_________
public postCabeceraDetalle(){
  this.cabeceraService.postCreateCabecera({
    cli_codigo:this.cli_codigo,
    com_total:this.txtTotal,
    com_fecha:this.fecha
    
  })
  .subscribe((cabecera:any)=>{
   console.log('Cabecera creado correctamente',cabecera.at().com_codigo);
   this.detalles.map((detalle:any)=>{
     this.detalleService
     .postCreateDetalle({
        com_codigo:cabecera.at().com_codigo, 
        mar_codigo:detalle.mar_codigo, 
        aut_codigo:detalle.aut_codigo, 
        det_com_cantidad:detalle.det_com_cantidad, 
        det_com_precio_total:detalle.det_com_precio_total
     })
     .subscribe((respuesta:any)=>{
       console.log('Detalle creado correctamete',respuesta);
     });
   });
   this.form.reset();
  })
 }



}
