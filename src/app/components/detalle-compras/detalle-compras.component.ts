import { Component, OnInit } from '@angular/core';
//Importamos form... para recoger los datos de html
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Importamos los CabeceraService-->fac_compras para manipular metodos
import { FacComprasService } from 'src/app/service/fac-compras.service';

//ADICIONAL 
// importar el roter para los datos extraidos de otro html
import { ActivatedRoute } from '@angular/router';
//Importamos ModelProducto-->ModelProducto para almacenar datos
//pendiente importacion
//importamos ModelDetalle-->ModelDetalle_compras para almacenar datos  de los producto escogidos
import { ModelDetalle_compras } from 'src/app/model/model.detalle_compras';
//importamos DetalleService-->Detalle_comprasService para manipular los metodos
import { ProductoService } from 'src/app/service/producto.service';
import { ModelProducto } from 'src/app/model/model.producto';
import { DetalleComprasService } from 'src/app/service/detalle-compras.service';
import { ModelFac_compras } from 'src/app/model/model.fac_compras';
import { DatePipe } from '@angular/common';
import { ProveedorService } from 'src/app/service/proveedor.service';
//Importamos ModelObjCab --> ModelProveedor para almacenar datos para el objeto cabecera
import { ModelProveedor } from 'src/app/model/model.proveedor';
import { FacComprasComponent } from '../fac-compras/fac-compras.component';


@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['./detalle-compras.component.css']
})
export class DetalleComprasComponent implements OnInit {

  //****inializamos las importaciones realizadas menos el model
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ProductoService: ProductoService,
    private proveedorService: ProveedorService,
    private Fac_comprasService: FacComprasService,
    private Detalle_comprasService: DetalleComprasService,
    //private marcaService: MarcaService
  ) { }
  //****fin  */
  //---Crear variable ModelCabecera para almacenar datos
  Productos: ModelProducto[] = []
  public form!: FormGroup;
  proveedors: ModelProveedor[] = []
  proveedorss: ModelProveedor[] = []
  proveedorId: ModelProveedor[] = []
  public fac_comprasid: ModelFac_compras[] = []
  Detalle_comprass: ModelDetalle_compras[] = []
  fcom_ids = ""
  arreglofact: ModelFac_compras[] = []
  //marcas:ModelMarca[]=[]
  //Variables entrantes temporales

  public informacionProveedor = {
    pro_cedula_ruc: "",
    pro_nombre: "",
    pro_direccion: "",
    pro_ciudad: "",
    pro_telefono: "",
    pro_correo: "",
    pro_credito_contado: "",
  }
  //Iniciacion de variables de Producto
  public informacionProducto = {
    prod_id: 0,
    prod_nombre: "",
    pro_descripcion: "",
    prod_iva: "",
    prod_costo: 0,
    prod_pvp: 0,
    pro_imagen: "",
    prod_stock: 0,
    pro_categoria: {
      cat_id: 0,
      cat_nombre: ""

    }

  }
  //public fcom_id_final!: String;
  public verificar = true;
  public verificarid = false;


  //variables temporales propias
  Producto: any
  Proveedor: any
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  fecha: any;
  Detalle_compras: any
  public contador: number = 0;
  public txtTotal: number = 0;
  public cantidad: number = 1;
  public costo: number = 0;
  public civa: number = 0;
  public valoriva: number = 0;
  public txtVuelto: number = 0;
  public pro_ToF = false;
  fechav: any;

  //______Inicalizar datos para html_______________//
  ngOnInit(): void {
    this.fecha = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.fechav = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.cargarProducto();
    this.cargarProveedor();
    this.cargarProveedorActivos();
    this.cargarFac_compras_fcom_id();
    //parametros de entrada
    /* this.route.params.subscribe(
       params => {
         this.fcom_id_final = params['fcom_id_final'];
         console.log(this.fcom_id_final);
 
       }
     )*/
    //datos recogios del html
    this.form = this.formBuilder.group({
      ProveedorSelected: [null, [Validators.required]],
      ProductoSelected: [null, [Validators.required]],
      txtcantidad: ['', [Validators.required]],
      txtpro_cedula_ruc: [''],
      txtnumfactingresado: [''],
      txtpro_nombre: [''],
      txtpro_direccion: [''],
      txtpro_ciudad: [''],
      txtpro_telefono: [''],
      txtpro_correo: [''],
      txtpro_credito_contado: [''],
      txtpro_credito: [''],
      txtfecha: [''],
      txtTotal: [''],
      txtPago: [''],
      txtVuelto: [''],
      txtSaldo: [''],
      txtfcom_fechaven: [''],
      //variables de entrada de para factura


      //variables de entrada de productos
      txtprod_descripcion: [''],
      txtprod_iva: [''],
      txtprod_costo: ['', [Validators.required]],
      txtprod_pvp: [''],
      txtpro_imagen: [''],
      txtprod_stock: [''],
      txtpro_categoria: {
        txtcat_id: [''],
        txtcat_nombre: ['']
      }

    })

    //form... del html
  }

  public cargarFac_compras_fcom_id() {
    this.Fac_comprasService.getFac_comprasid().subscribe(
      (fac_compras: any) => {
        this.fac_comprasid = fac_compras
      }, (error) => console.log(error)
    )
  }

  public verificaridcompra(id: string) {
    let numid = false
    console.log("............" + this.fac_comprasid.length)
    console.log("............" + id)
    for (let i = 0; i < this.fac_comprasid.length; i++) {
      this.fac_comprasid.map((fac_compras: any) => {
        this.fcom_ids = fac_compras.fcom_id
        //--
        console.log("............" + this.fcom_ids)
        //cicloo for para verificar el numero 
        if (this.fcom_ids == id) {
          numid = true
          console.log(this.fcom_ids)

        }
      })
    }
    return numid
  }

  //______________FIN_____________
  //°°°°°°°°°°°°| Crear Metodos de Detalle|°°°°°°°
  public cargarProducto() {
    this.ProductoService.getProducto().subscribe( //------------------cambiar
      (Producto: any) => {
        this.Productos = Producto
        console.log(this.Productos);
      }, (error) => console.log(error)
    )
  }
  //cargar Proveedor
  public cargarProveedor() {
    this.proveedorService.getProveedor().subscribe(
      (proveedor: any) => {
        this.proveedors = proveedor
        console.log(this.proveedors)
      }, (error) => console.log(error)
    )
  }
  //cargar Proveedor
  public cargarProveedorActivos() {
    this.proveedorService.getProveedorActivos().subscribe(
      (proveedor: any) => {
        this.proveedorss = proveedor
        console.log(this.proveedorss)
      }, (error) => console.log(error)
    )
  }
  //Metodo para calcualr el cambio
  public CalculoCambio() {
    let pago = parseInt(this.form.value.txtPago == undefined ? 1 : this.form.value.txtPago);
    this.txtVuelto = this.txtTotal-pago
  }
  //Metodo para asignar el Tipo de Pago
  public AsignarTipoPago() {

    let pro_credito_contado = this.form.value.txtpro_credito_contado
    if (pro_credito_contado == "Credito") {
      this.pro_ToF = true;
    } else {
      this.pro_ToF = false;
    }

    console.log(this.pro_ToF)
    console.log("..............")
  }
  //Metodo para buscar objetos en un arreglo Proveedor
  public findProveedor() {
    this.agregarProveedor()
    console.log(this.Proveedor.substr(0, 10))
    this.Proveedor = this.proveedors.find(({ pro_cedula_ruc }) => pro_cedula_ruc === this.Proveedor.substr(0, 10))
    console.log(this.Proveedor)
    this.proveedorId.push(this.Proveedor)
    console.log(this.proveedorId + ".....")
    this.informacionProveedor.pro_cedula_ruc = this.Proveedor.pro_cedula_ruc,
      this.informacionProveedor.pro_nombre = this.Proveedor.pro_nombre,
      this.informacionProveedor.pro_direccion = this.Proveedor.pro_direccion,
      this.informacionProveedor.pro_ciudad = this.Proveedor.pro_ciudad,
      this.informacionProveedor.pro_telefono = this.Proveedor.pro_telefono,
      this.informacionProveedor.pro_correo = this.Proveedor.pro_correo,
      this.pro_ToF = this.Proveedor.pro_credito_contado
    if (this.pro_ToF) {
      this.informacionProveedor.pro_credito_contado = "Credito";
    } else {
      this.informacionProveedor.pro_credito_contado = "Contado";
    }
    this.verificar = false;
  }

  //Metodo para buscar objetos en un arreglo Producto

  public findProducto() {
    this.agregarProducto()
    console.log(this.Producto.substr(0, 20))
    this.Producto = this.Productos.find(({ prod_nombre }) => prod_nombre === this.Producto.substr(0, 20))
    console.log('----')
    this.informacionProducto.prod_id = this.Producto.prod_id
    this.informacionProducto.prod_nombre = this.Producto.prod_nombre,
      this.informacionProducto.pro_descripcion = this.Producto.pro_descripcion,
      this.informacionProducto.prod_iva = this.Producto.prod_iva,
      this.informacionProducto.prod_costo = this.Producto.prod_costo
    this.informacionProducto.prod_pvp = this.Producto.prod_pvp,
      this.informacionProducto.pro_imagen = this.Producto.pro_imagen
    this.informacionProducto.prod_stock = this.Producto.prod_stock
    this.informacionProducto.pro_categoria.cat_id = this.Producto.pro_categoria.cat_id
    this.informacionProducto.pro_categoria.cat_nombre = this.Producto.pro_categoria.cat_nombre
  }


  //coger el objeto Producto(productos) 
  get ProductoSelected() {
    return this.form.get('ProductoSelected');
  }
  public agregarProducto() {
    this.Producto = this.ProductoSelected?.value;
    console.log(this.Producto)
    console.log(this.Producto.prod_id, this.Producto.prod_nombre)
  }
  //coger el objeto Proveedor
  get ProveedorSelected() {
    return this.form.get('ProveedorSelected');
  }
  public agregarProveedor() {
    this.Proveedor = this.ProveedorSelected?.value;
    console.log(this.Proveedor)
    console.log(this.Proveedor.pro_nombre, this.Proveedor.pro_cedula_ruc)
  }
  //Agregar Fecha Vencimiento
  public fechaVencimiento() {
    this.fechav = this.pipe.transform(this.form.value.txtfcom_fechaven)
    console.log(this.fechav + "Mestro Detalle")
  }
  /*
    public idfactverificar() {
      for (var i = 0; this.arreglofact.length; i++) {
        if (this.arreglofact[i].fcom_id == this.form.value.txtnumfactingresado) {
          this.verificarid = true
          window.alert("El numero de Factura ya existe");
          break
        }
      }
      return this.verificarid
    }
  */

  //----------------------------------------------------------cambiar los atributos por productos
  //Agregar Producto(producto) escogido a un arreglo
  public agregarDetalle_compras() {
    if (this.verificaridcompra(this.form.value.txtnumfactingresado) == false) {
      let cantidad = parseInt(this.form.value.txtcantidad == undefined ? 1 : this.form.value.txtcantidad);
      let precioProducto = this.form.value.txtprod_costo == undefined ? 1 : this.form.value.txtprod_costo;

      if (this.form.value.txtprod_iva == true) {
        this.civa = precioProducto * 1.12 * cantidad;
        this.valoriva=Number((precioProducto*0.12).toFixed(2));
      } else {
        this.civa = precioProducto * cantidad;
      }
      let total = Number(this.civa.toFixed(2));
      this.costo = precioProducto;
      this.Detalle_compras = {
        /*
             com_id:Number,
           fcom_id:String,
            dcom_cantidad:Number, 
            prod_id:Number, 
            dcom_precio:Number,
             */
        //mar_codigo:this.marca.mar_codigo,
        prod_id: this.Producto.prod_id,
        prod_nombre: this.Producto.prod_nombre,
        prod_costo: this.Producto.prod_costo,
        pro_imagen: this.Producto.pro_imagen,
        dcom_cantidad: this.cantidad,
        dcom_costo: this.costo,
        dcom_valoriva: this.valoriva,
        dcom_precio: total,


      };
      this.txtTotal += this.Detalle_compras.dcom_precio;
      this.Detalle_comprass.push(this.Detalle_compras)

    }else{
      window.alert('El Número de factura ya existe : '+this.form.value.txtnumfactingresado);
    }
  }
  public quitarDetalle_compras(Detalle_compras: any) {
    this.txtTotal = this.txtTotal - Detalle_compras.dcom_precio;
    this.Detalle_comprass.map((det) => { });
    this.Detalle_comprass = [
      ...this.Detalle_comprass.filter((det) => det.prod_id !== Detalle_compras.prod_id),

    ];

  }

  //_____*-- Ingreso de Mestro detale a la base de datos --*_________
  public postCabeceraDetalle_compras() {
    console.log("dddddddddddddddddddddddddddddddddddd")
    console.log(
      this.fechav,
      this.form.value.txtnumfactingresado,
      this.informacionProveedor.pro_cedula_ruc,
      this.fecha,
      this.txtTotal,
      ("ddghghhhhhhhhhhhhgggggggggggdddddddd")
    )

    this.Fac_comprasService.postFac_compras({
      fcom_id: this.form.value.txtnumfactingresado,
      pro_cedula_ruc: this.informacionProveedor.pro_cedula_ruc,
      fcom_fecha: this.fecha,
      fcom_credito_contado: this.pro_ToF,
      fcom_fechavencimiento: this.fechav,
      fcom_total: this.txtTotal

    })
      .subscribe((Fac_compras: any) => {
        console.log('Fac_compras creado correctamente' + Fac_compras.at().fcom_id);
        this.Detalle_comprass.map((Detalle_compras: any) => {
          this.Detalle_comprasService
            .postDetalle_compras({
              /*
              com_id:Number,
            fcom_id:String,
             dcom_cantidad:Number, 
             prod_id:Number, 
             dcom_precio:Number,
              */

              fcom_id: Fac_compras.at().fcom_id,
              dcom_cantidad: Detalle_compras.dcom_cantidad,
              dcom_costo: Detalle_compras.dcom_costo,
              prod_id: Detalle_compras.prod_id,
              dcom_precio: Detalle_compras.dcom_precio
            })
            .subscribe((respuesta: any) => {
              console.log('Detalle creado correctamete', respuesta);
              this.contador = 0
            });
        });
        this.form.reset();
      })

  }
  public refresh() {
    window.location.reload();
  }
}
