import { Component, OnInit } from '@angular/core';
//Importar el router para transdar datos en html
import { Router } from '@angular/router';
//Importamos form... para recoger los datos de html
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
//Importamos el ModelCabecera--> ModelFac_compras para manipular datos
import { ModelFac_compras } from 'src/app/model/model.fac_compras';
//Importamos los CabeceraService Fac_comprasService para manipular metodos 
import { FacComprasService } from 'src/app/service/fac-compras.service';
//Importamos ObjCab --> proveedores.service para utilizar los metodos 
import { ProveedorService } from 'src/app/service/proveedor.service';
//Importamos ModelObjCab --> ModelProveedor para almacenar datis para el objeto cabecera
import { ModelProveedor } from 'src/app/model/model.proveedor';
//Importamos detalleService--> detalle_comprasService para manipular metodos
import { DetalleComprasService } from 'src/app/service/detalle-compras.service';

//importacionesa adicional
// importar el roter para los datos extraidos de otro html
import { ActivatedRoute } from '@angular/router';
//Importamos ModelObjDet --> para almacenar datos

@Component({
  selector: 'app-proveedor',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public form!:FormGroup;
  public proveedors:ModelProveedor[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private proveedorService:ProveedorService

  ) { }

  ngOnInit(): void {
    this.cargarProveedor()

    this.form=this.formBuilder.group({
    txtpro_cedula_ruc:[''], 
    txtpro_nombre:[''], 
    txtpro_direccion:[''], 
    txtpro_ciudad:[''], 
    txtpro_telefono:[''], 
    txtpro_correo:[''], 
    txtpro_credito_contado:['']
      
    })
  }
  //Cargar proveedor
  public cargarProveedor(){
    this.proveedorService.getProveedor().subscribe(
      (proveedor:any)=>{
        this.proveedors=proveedor
        console.log(this.proveedors)
      },(error)=>console.log(error)
    )
  }

  //Crear Proveedor
  public crearProveedor(){
    this.proveedorService.postProveedor({
      pro_cedula_ruc:this.form.value.txtpro_cedula_ruc, 
      pro_nombre:this.form.value.txtpro_nombre, 
      pro_direccion:this.form.value.txtpro_direccion, 
      pro_ciudad:this.form.value.txtpro_ciudad, 
      pro_telefono:this.form.value.txtpro_telefono, 
      pro_correo:this.form.value.txtpro_correo, 
      pro_credito_contado:this.form.value.txtpro_credito_contado

    }).subscribe(
      respuesta=>{
        console.log('Proveedor creada correctamente');
        this.form.reset()
        this.cargarProveedor();
      }
    )
  }
  //Eliminar Proveedor
  public eliminarProveedor(pro_cedula_ruc:any){   
    this.proveedorService.deleteProveedor({
      pro_cedula_ruc:pro_cedula_ruc
    }).subscribe(
      respuesta=>{
        console.log('Proveedor eliminada correctamente');
        this.cargarProveedor()
      }
    )
  }

  public actualizaProveedor(pro_cedula_ruc:any){
    console.log(this.form.value.txtpro_nombre,this.form.value.txtpro_direccion)
    console.log("oooooooooooooooooo")
    this.proveedorService.putUpdateProveedor({
      pro_cedula_ruc:pro_cedula_ruc,
      pro_nombre:this.form.value.txtpro_nombre, 
      pro_direccion:this.form.value.txtpro_direccion, 
      pro_ciudad:this.form.value.txtpro_ciudad, 
      pro_telefono:this.form.value.txtpro_telefono, 
      pro_correo:this.form.value.txtpro_correo,
      pro_credito_contado:this.form.value.txtpro_credito_contado
     
    }).subscribe(
      respuesta=>{
        console.log('Proveedoractualizada correctamente');
        console.log(this.form.value.txtpro_nombre,this.form.value.txtpro_direccion)
        this.form.reset()
        this.cargarProveedor()
      }
    )
  }

}