import { Component, OnInit } from '@angular/core';

//Importar el router para transdar datos en html
import { Router } from '@angular/router';
//Importamos form... para recoger los datos de html
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importar Facturas de proveedores

//Importamos la cabecera --> ModelFac_compras para manipular datos
import { ModelFac_compras } from 'src/app/model/model.fac_compras';
//Importamos la cabecera los Fac_comprasService  para manipular metodos 
import { FacComprasService } from 'src/app/service/fac-compras.service';
//Importamos ObjCab --> proveedores.service para utilizar los metodos 
import { ProveedorService } from 'src/app/service/proveedor.service';
//Importamos ModelObjCab --> ModelProveedor para almacenar datis para el objeto cabecera
import { ModelProveedor } from 'src/app/model/model.proveedor';
//Importamos detalleService--> detalle_comprasService para manipular metodos
import { DetalleComprasService } from 'src/app/service/detalle-compras.service';
import { ProductoService } from 'src/app/service/producto.service';
import { ModelProducto } from 'src/app/model/model.producto';
import { ModelDetalle_compras } from 'src/app/model/model.detalle_compras';

//Importar para Impirmir PDF
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-fac-compras',
  templateUrl: './fac-compras.component.html',
  styleUrls: ['./fac-compras.component.css']
})
export class FacComprasComponent implements OnInit {
  //****inializamos las importaciones realizadas menos el model 

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private fac_comprasService: FacComprasService,
    private proveedorService: ProveedorService,
    private detallecomprasService: DetalleComprasService,
    private productoService: ProductoService,
    private Detalle_comprasService: DetalleComprasService,


  ) { }
  //****fin  */
  //---Crear variable ModelCabecera --> ModelFac_compras para almacenar datos
  public columns = ["ID", "Producto", "Cantidad", "Precio $"];
  public rows: any[] = [];
  fac_comprass: ModelFac_compras[] = []
  public fac_comprasss: ModelFac_compras[] = []
  public fac_comprasid: ModelFac_compras[] = []
  public form!: FormGroup;
  proveedors: ModelProveedor[] = []
  productos: ModelProducto[] = []
  public Detalle_comprass: ModelDetalle_compras[] = []

  //Variables temporales
  proveedor: any
  fac_compras: any
  fac_numero = 0
  com_credito_contado: any
  fcom_ids = ""
  public fcom_id_two = 0
  public fcom_id_final = "";
  verificacion = true
  num!: Number
  Producto: any
  //---fin

  ngOnInit(): void {

    this.cargarProducto();
    this.cargarFac_compras();
    // this.cargarFac_compras_fcom_id();
    this.cargarProveedor();

    //form... del html
    //pendiente
    //definir la variable tempral cabecera
    //definir la variable tempral cabecera
    /*
    this.fac_compras={
      pro_cedula_ruc:"",
      fcom_fecha:"",
      fcom_credito_contado:"",
      fcom_fechavencimiento:"",
      fac_numero:"",
      fcom_id:""
      
    }
    */
    this.form = this.formBuilder.group({
      txtfcom_credito_contado: [''],
      proveedorSelected: [''],
      txtfac_compras_fcom_id: [''],
    })

  }


  //______________FIN_____________
  //°°°°°°°°°°°°| Crear Metodos de Cabecera |°°°°°°°
  //----cargar cabecera---
  public cargarFac_compras_fcom_id() {
    this.fac_comprasService.getFac_compras_fcom_id().subscribe(
      (fac_compras: any) => {
        this.fac_comprasss = fac_compras
        //---
        this.fac_comprasss.map((fac_compras: any) => {
          this.fcom_ids = fac_compras.fcom_id
          //--
          //cicloo for para verificar el numero 
          for (let i = 1; i < this.fcom_ids.length; i++) {
            if (parseInt(this.fcom_ids.substr(-i)) >= 0) {
              this.num = i;
              console.log(this.num)

            } else {
              break
            }
          }
          this.fcom_id_two = parseInt(this.fcom_ids.substr(-this.num)) + 1
          this.fcom_id_final = "FAC-000" + this.fcom_id_two
          console.log(this.fcom_ids)
          console.log(this.fcom_id_two)
          console.log(this.fcom_id_final)

        })
        console.log(this.fac_comprasss)
        console.log('oooooooooooo')
      }, (error) => console.log(error)
    )
  }
 



  public cargarFac_compras() {
    this.fac_comprasService.getFac_compras().subscribe(
      (fac_compras: any) => {
        this.fac_comprass = fac_compras
        console.log(this.fac_comprass)
        console.log('wwwwwwwwwwwww')
      }, (error) => console.log(error)
    )
  }

  //cargar ObjCab .--> Proveedor para la Factura cabecera
  public cargarProveedor() {
    this.proveedorService.getProveedor().subscribe(
      (proveedor: any) => {
        this.proveedors = proveedor
        console.log(this.proveedors)
      }, (error) => console.log(error)
    )
  }
  //_____________*--------Creacion Cabecera Fac_compras Temporal--------*________
  public crearFac_compras() {
    this.fac_numero = 1;
    this.com_credito_contado = this.form.value.txtfcom_credito_contado
    this.fac_compras = {
      pro_cedula_ruc: this.form.value.proveedorSelected,
    };

  }

  //_____________*--------Eliminar una Cabecera--------*________
  public eliminarFac_compras(fcom_id: any) {
    console.log(fcom_id + "iiiiii");
    this.fac_comprasService.deleteFac_compras(fcom_id).subscribe(
      respuesta => {
        console.log('eliminada correctamente');
        console.log(fcom_id + "iiiiii");
        this.cargarFac_compras()
      }
    )
  }
  //Cargar proveedor
  public cargarProducto() {
    this.productoService.getProducto().subscribe(
      (producto: any) => {
        this.productos = producto
        console.log("Producto--");
        console.log(this.productos)
      }, (error) => console.log(error)
    )
  }



  //Refrescar Página
  public refresh() {
    window.location.reload();
  }
  //Metodo para imprimir
  makePDF(numerof: any) {
    var pdf = new jsPDF('landscape', 'mm', 'letter');
    var imgData = 'https://thumbs.dreamstime.com/b/muestra-y-s%C3%ADmbolo-del-vector-icono-de-la-factura-aislados-en-el-fondo-blanco-concepto-logotipo-134164232.jpg';
    // Variables de Factura Cabecera
    this.cargarFac_compras();
    let ids = "";
    let id_pro = "";
    let total = "";
    let forma_p = "CREDITO";
    let fecha_i = new Date();
    let fecha_v = new Date();
    // Variables de proveedor
    let pro_nombre = "";
    let pro_direccion = "";
    let pro_correo = "";
    pdf.setFontSize(30)
    pdf.text('FACTURA COMPRA', 95, 30)
    //pdf.text("FACTURA",10,200);
    pdf.addImage(imgData, 'JPEG', 1, 1, 50, 50);
    this.fac_comprass.forEach(compras => {
      if (numerof == compras.fcom_id) {
        ids = compras.fcom_id + '';
        total = compras.fcom_total + '';
        id_pro = compras.pro_cedula_ruc + '';
        if (!compras.fcom_credito_contado) {
          forma_p = "CONTADO";
        }
        fecha_i = compras.fcom_fecha;
        fecha_v = compras.fcom_fechavencimiento;
      }
    })
    console.log('chassss')
    console.log(fecha_i)
    console.log(fecha_v)
    this.proveedors.forEach(proveedor => {
      if (id_pro == proveedor.pro_cedula_ruc) {
        pro_nombre = proveedor.pro_nombre + '';
        pro_direccion = proveedor.pro_direccion + '';
        pro_correo = proveedor.pro_correo + '';
      }
    })

    //this.cargarDetalle_compras(numerof)
    console.log("this.rows" + this.Detalle_comprass['length']);

    autoTable(pdf, {
      startY: 50,
      tableLineWidth: 2,
      columnStyles: {
        0: { halign: 'center', fillColor: [255, 218, 185] },
        2: { halign: 'center', fillColor: [255, 218, 185] }
      },
      body: [
        ['# Factura:', ids, 'Proveedor: ', pro_nombre],
        ['C.I/RUC: ', id_pro, 'Dirección: ', pro_direccion],
        ['Correo:', pro_correo],
      ]
      ,
    })
    /*
    for (var k = 0; k < 2; k++) {
      this.rows.push([
        this.Detalle_comprass[k].prod_id,
        this.Detalle_comprass[k].dcom_cantidad,
        this.Detalle_comprass[k].dcom_precio,
      ]);
    }
    */

    pdf.setLineWidth(1.3)
    pdf.setDrawColor(0, 0, 0)
    pdf.line(10, 46, 270, 46)

    autoTable(pdf, {
      //startY : 50,
      tableLineWidth: 2,
      head: [['PAGO CREDITO/CONTADO', 'FECHA:', 'FECHA VENCIMIENTO:']],
      body: [
        [forma_p, fecha_i + '', fecha_v + ''],
      ]
      ,
    })
    console.log('detalles')
    this.cargarDetalle_compras(numerof);
    console.log(this.Detalle_comprass)
    console.log(this.buscar_nombre_pro("PRD-0002"))
    console.log(this.buscar_nombre_pro("PRD-0001"))
    this.Detalle_comprass.forEach(detalles => {
      if (numerof == detalles.fcom_id) {
        this.rows.push([
          detalles.prod_id,
          this.buscar_nombre_pro(detalles.prod_id),
          detalles.dcom_cantidad,
          detalles.dcom_precio
        ])
      }
    })
    console.log("this.rows");
    console.log(this.rows);
    autoTable(pdf, {
      //startY : 50,
      tableLineWidth: 2,
      head: [this.columns],
      body:
        this.rows
      ,
    })

    autoTable(pdf, {
      columnStyles: { 0: { halign: 'center', fillColor: [192, 192, 192] } }, // Cells in first column centered and green
      margin: { top: 10, left: 190 },
      body: [
        ['TOTAL:', total + ' $'],
      ],
    })
    if (this.rows.length != 0) {
      pdf.save('Factura');
      window.location.reload();
    }
  }
  //---------------Para el pdf______
  public cargarDetalle_compras(id: string) {
    console.log("ESTE---Detalle");
    console.log(id);
    this.Detalle_comprasService.getDetallePorNameDetalle(id).subscribe(
      (Detalle_compras: any) => {
        this.Detalle_comprass = Detalle_compras
        console.log("ALEJANDRO");
        console.log(this.Detalle_comprass);
        console.log("ALENADRO");
      }, (error) => console.log(error)

    )
  }
  public buscar_nombre_pro(id: String) {
    let nombre: String = "";
    this.productos.forEach(producto => {
      if (id == producto.prod_id) {
        nombre = producto.prod_nombre;
      }
    })
    return nombre;
  }
  //hasta aqui imprimir factura
}
