import { Component, OnInit } from '@angular/core';


//Importamos form... para recoger los datos de html
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos el ModelCabecera-->ModelFac_compras para manipular datos
import { ModelFac_compras } from 'src/app/model/model.fac_compras';
//Importamos los CabeceraService -->Fac_comprasService para manipular metodos 
import { FacComprasService } from 'src/app/service/fac-compras.service';
//Importamos ObjCabService --> ProveedorService para utilizar los metodos 
import { ProveedorService } from 'src/app/service/proveedor.service';
//Importamos ModelObjCab --> ModelProveedor para almacenar datis para el objeto cabecera
import { ModelProveedor } from 'src/app/model/model.proveedor';
import { ProductoService } from 'src/app/service/producto.service';
import { ModelProducto } from 'src/app/model/model.producto';

//ADICIONAL 
// importar el roter para los datos extraidos de otro html
import { ActivatedRoute } from '@angular/router';
//importamos ModelDetalle--> ModelDetalle_compras para almacenar datos  de los producto escogidos
import { ModelDetalle_compras } from 'src/app/model/model.detalle_compras';
//importamos DetalleService-->Detalle_comprasService para manipular los metodos
import { DetalleComprasService } from 'src/app/service/detalle-compras.service';

@Component({
  selector: 'app-vista-maes-deta',
  templateUrl: './vista-maes-deta.component.html',
  styleUrls: ['./vista-maes-deta.component.css']
})
export class VistaMaesDetaComponent implements OnInit {

  //****inializamos las importaciones realizadas menos el model
  constructor(
    public route: ActivatedRoute,
    private Detalle_comprasService: DetalleComprasService,
    private ProveedorService: ProveedorService,
    private productoService: ProductoService
  ) { }
  //****fin  */

  //---Crear variable ModelCabecera para almacenar datos-----
  public form!: FormGroup;

  public Fac_comprass: ModelFac_compras[] = []
  public Detalle_comprass: ModelDetalle_compras[] = [

  ]
  public Detalle_comprasss: ModelDetalle_compras[] = []
  public provedores: ModelProveedor[] = []
  public productos: ModelProducto[] = []
  //Variables entrantes temporales de otra web
  public pro_cedula_ruc!: String
  public pro_nombre!: String
  Producto: any
  Provedor: any

  public prod_id !: String
  public fcom_id !: String




  //variables temporales propias
  //---fin

  ngOnInit(): void {
    //parametros de entrada
    this.cargarProducto()
    this.route.params.subscribe(
      params => {

        this.pro_cedula_ruc = params['pro_cedula_ruc'];
        this.pro_nombre = params['pro_nombre'];
        this.fcom_id = params['fcom_id'];
        console.log(this.pro_cedula_ruc);
        console.log(this.pro_nombre);
        console.log(this.fcom_id);
      }
    )
    this.cargarProveedor()
    setTimeout(()=>{
        this.cargarDetalle_compras()
    }, 4500)
    

  }
  //°°°°°°°°°°°°| Crear Metodos de Detalle|°°°°°°°°°°°°°°°°°°°°°°°°°°°
  //--metodo buscar ObjCab(Proveedor)
  public cargarProveedor() {
    this.ProveedorService.getProveedorByName(this.pro_cedula_ruc).subscribe(
      (Proveedor: any) => {
        this.provedores = Proveedor
        console.log("Proveedor");
        console.log(this.provedores);
        this.pro_nombre=this.provedores[0].pro_nombre
      }, (error) => console.log(error)

    )
  }
  //Cargar proveedor
  public cargarProducto() {
    this.productoService.getProducto().subscribe(
      (producto: any) => {
        this.productos = producto
        console.log("Producto");
        console.log(this.productos)
      }, (error) => console.log(error)
    )
  }

  
  //----metodo para buscar detalles de cabecera(fac_compras)
  
  public cargarDetalle_compras() {
    
    this.Detalle_comprasService.getDetallePorNameDetalle(this.fcom_id).subscribe(
      (detalle_compras: any) => {
        this.Detalle_comprass = detalle_compras
        console.log("Detalle_Compras");
        console.log(this.Detalle_comprass)

        for (let i = 0; i < this.Detalle_comprass.length; i++) {
          this.prod_id = this.Detalle_comprass[i].prod_id
          console.log("Pro_id");
          console.log(this.prod_id)
          this.Producto = this.productos.find(({ prod_id: prod_id }) =>prod_id=== this.prod_id)
          
          this.Detalle_comprass[i].prod_nombre = this.Producto.prod_nombre
          this.Detalle_comprass[i].prod_descripcion = this.Producto.prod_descripcion
          console.log(this.Producto.prod_nombre)
        }
      }, (error) => console.log(error)
    )

  }
  

  //----metodo para buscar detalles de cabecera(fac_compras)
  /*
   public cargarDetalle_compras() {
     console.log("Detalle_compras");
     this.Detalle_comprasService.getDetallePorNameDetalle(this.fcom_id).subscribe(
       (Detalle_compras: any) => {
         this.Detalle_comprass = Detalle_compras
         console.log(this.Detalle_comprass + "ww")
         console.log("cargarDetalle_compras----");
       }, (error) => console.log(error)
 
     )
   }
   */


}


