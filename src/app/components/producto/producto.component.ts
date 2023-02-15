import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelProducto } from 'src/app/model/model.producto';
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
import { ProductoService } from 'src/app/service/producto.service';
//Importamos ModelObjDet --> para almacenar datos

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  
  public form!:FormGroup;
  public productos:ModelProducto[]=[]

  public informacionProducto={
    prod_codigo: "",
    cat_codigo:"",
    prod_nombre: "",
    prod_descripcion: "",
    prod_iva:"",
    prod_costo:"",
    prod_pvp:"",
    prod_estado:"",
    prod_totalstock:""
    
  }

  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private productoService:ProductoService
  ) 
  { }

  ngOnInit(): void {
    this.cargarProducto()
   
  }

 //Cargar proveedor
 public cargarProducto(){
  console.log("kevin")
  this.productoService.getProducto().subscribe(
    (producto:any)=>{
      this.productos=producto
      console.log(this.productos)
    },(error)=>console.log(error)
  )
}

}
