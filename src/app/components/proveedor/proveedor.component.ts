import { Component, OnInit } from '@angular/core';
//Importar el router para transdar datos en html
import { Router } from '@angular/router';
//Importamos form... para recoger los datos de html
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
//importar Facturas de proveedores
import { ModelFac_proveedor } from 'src/app/model/model.fac_proveedor';

//importacionesa adicional
// importar el roter para los datos extraidos de otro html
import { ActivatedRoute } from '@angular/router';
//Importamos ModelObjDet --> para almacenar datos

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  public form!: FormGroup;
  public proveedors: ModelProveedor[] = []
  public fac_proveedor: ModelFac_compras[] = []
  public fac_proveedors: ModelFac_proveedor[] = []
  public fac_comprass: ModelFac_compras[] = []
  public fac_comprasss: ModelFac_compras[] = []
  //variables temporales
  pro_cedula_ruc: any
  Proveedor: any
  facturas: any
  public pro_ToF = true;
  public ToF = ""
  public ToF2 = ""
  public ToF3 = ""
  public verificador = false
  public verificador2 = false;
  public fcom_id!: String

  public informacionProveedor = {
    pro_cedula_ruc: "",
    pro_nombre: "",
    pro_direccion: "",
    pro_ciudad: "",
    pro_telefono: "",
    pro_correo: "",
    pro_credito_contado: ""

  }

  constructor(
    private formBuilder: FormBuilder,
    private fac_comprasService: FacComprasService,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService

  ) { }

  ngOnInit(): void {
    this.cargarProveedor();
    //this.cargarFac_Pagadas();
    this.cargarFac_compras();

    this.form = this.formBuilder.group({
      ProveedorSelected: [null, [Validators.required]],
      txtpro_cedula_ruc: [''],
      txtpro_nombre: [''],
      txtpro_direccion: [''],
      txtpro_ciudad: [''],
      txtpro_telefono: [''],
      txtpro_correo: [''],
      txtpro_credito_contado: [''],
      txtEstadoTrue: [''],
      txtEstadoFalse: ['']

    })
  }

  //Cargar proveedor
  public cargarProveedor() {
    this.pro_ToF = true
    this.proveedorService.getProveedor().subscribe(
      (proveedor: any) => {
        this.proveedors = proveedor
        console.log(this.proveedors)
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
  //Cargar proveedor Activos
  public cargarProveedorActivos() {
    this.pro_ToF = true
    this.proveedorService.getProveedorActivos().subscribe(
      (proveedor: any) => {
        this.proveedors = proveedor
        console.log(this.proveedors)
      }, (error) => console.log(error)
    )
  }
  //Cargar proveedor Inactivos
  public cargarProveedorInactivos() {
    this.pro_ToF = true
    this.proveedorService.getProveedorInactivos().subscribe(
      (proveedor: any) => {
        this.proveedors = proveedor
        console.log(this.proveedors)
      }, (error) => console.log(error)
    )
  }

  //Crear Proveedor
  public crearProveedor() {
    this.pro_ToF = true
    this.proveedorService.postProveedor({
      pro_cedula_ruc: this.form.value.txtpro_cedula_ruc,
      pro_nombre: this.form.value.txtpro_nombre,
      pro_direccion: this.form.value.txtpro_direccion,
      pro_ciudad: this.form.value.txtpro_ciudad,
      pro_telefono: this.form.value.txtpro_telefono,
      pro_correo: this.form.value.txtpro_correo,
      pro_credito_contado: Boolean(this.form.value.txtpro_credito_contado)

    }).subscribe(
      respuesta => {
        console.log('Proveedor creada correctamente');
        this.form.reset()
        this.cargarProveedor();
      }
    )
  }
  //Eliminar Lógico Proveedor
  public eliminarProveedor(pro_cedula_ruc: any) {
    this.pro_ToF = true
    this.proveedorService.deleteProveedor({
      pro_cedula_ruc: pro_cedula_ruc
    }).subscribe(
      respuesta => {
        console.log('Proveedor eliminada correctamente');
        this.cargarProveedor()
      }
    )
  }
  //Eliminado Físico Proveedor
  public eliminarFisicoProveedor() {
    this.pro_ToF = true
    this.proveedorService.deleteFisicoProveedor(this.pro_cedula_ruc).subscribe(
      respuesta => {
        console.log('Proveedor eliminada correctamente');
        console.log(this.pro_cedula_ruc)
        this.cargarProveedor()
      }
    )
  }
  public CargarProveedor(pro_cedula_ruc: any) {
    this.pro_ToF = true
    this.pro_cedula_ruc = pro_cedula_ruc
    console.log(this.pro_cedula_ruc)
  }
  //Actualizar Proveedor
  public infoUpdateProveedor(pro_cedula_ruc: any, pro_nombre: any, pro_direccion: any, pro_ciudad: any, pro_telefono: any, pro_correo: any, pro_credito_contado: any, pro_estado: any) {
    this.ToF = pro_estado + ""
    this.ToF2 = "true" + ""
    this.ToF3 = "false" + ""


    if (this.ToF.length == this.ToF2.length) {
      this.verificador = true;
      console.log(this.verificador)
    } else if (this.ToF.length == this.ToF3.length) {
      this.verificador = false
      console.log(this.verificador)
    }
    this.informacionProveedor.pro_cedula_ruc = pro_cedula_ruc,
      this.informacionProveedor.pro_nombre = pro_nombre,
      this.informacionProveedor.pro_direccion = pro_direccion,
      this.informacionProveedor.pro_ciudad = pro_ciudad,
      this.informacionProveedor.pro_telefono = pro_telefono,
      this.informacionProveedor.pro_correo = pro_correo,
      this.informacionProveedor.pro_credito_contado = pro_credito_contado



  }
  public actualizaProveedor(pro_cedula_ruc: any) {
    this.pro_ToF = true
    console.log(this.form.value.txtpro_nombre, this.form.value.txtpro_direccion)
    console.log("oooooooooooooooooo")
    this.ToF = this.form.value.txtEstadoTrue + ""
    console.log(this.ToF.length + "....actualizar");


    if (this.ToF.length == this.ToF2.length) {
      this.verificador = true;
      this.verificador2 = true;
      console.log(this.verificador)
    } else if (this.ToF.length == this.ToF3.length) {
      this.verificador = false;
      console.log(this.verificador)
    }
    console.log(this.verificador)
    this.proveedorService.putUpdateProveedor({
      pro_cedula_ruc: pro_cedula_ruc,
      pro_nombre: this.form.value.txtpro_nombre,
      pro_direccion: this.form.value.txtpro_direccion,
      pro_ciudad: this.form.value.txtpro_ciudad,
      pro_telefono: this.form.value.txtpro_telefono,
      pro_correo: this.form.value.txtpro_correo,
      pro_credito_contado: Boolean(this.form.value.txtpro_credito_contado),
      pro_estado: this.verificador

    }).subscribe(
      respuesta => {
        console.log('Proveedoractualizada correctamente');
        console.log(this.form.value.txtpro_nombre, this.form.value.txtpro_direccion)
        this.form.reset()
        this.cargarProveedor()
        if (this.verificador2) {
          this.verificador = false
        }
      }
    )
  }
  get ProveedorSelected() {
    return this.form.get('ProveedorSelected');
  }
  public agregarProveedor() {
    this.Proveedor = this.ProveedorSelected?.value;
    console.log(this.Proveedor)
    console.log(this.Proveedor.pro_nombre, this.Proveedor.pro_cedula_ruc)
  }
  public findProveedor() {
    this.pro_ToF = false
    this.agregarProveedor()
    console.log(this.Proveedor.substr(0, 10))
    this.Proveedor = this.proveedors.find(({ pro_cedula_ruc }) => pro_cedula_ruc === this.Proveedor.substr(0, 10))
    this.proveedors = []
    this.proveedors.push(this.Proveedor)
    console.log(this.Proveedor)
  }

  public refresh() {
    window.location.reload();
  }


  //____--------Factura por Proveedor--------___
  public buscarFac_prov(pro_cedula_ruc: string) {
    console.log("KATARIII-sqsd")
    //id = '1004003652';
    console.log(pro_cedula_ruc)
    this.fac_comprasService.getFac_compras_pro(pro_cedula_ruc).subscribe(
      (fac_proveedor: any) => {
        this.fac_proveedor = fac_proveedor
        console.log(this.fac_proveedor);
        console.log("KATARI");
        console.log("---------------------------------------------------")
        for (let i = 0; i < this.fac_proveedor.length; i++) {
          this.fcom_id = this.fac_proveedor[i].fcom_id
          console.log("fcom_id: " + this.fcom_id);
          this.facturas = this.fac_proveedors.find(({ fcom_id }) => fcom_id === this.fcom_id)
          console.log(this.facturas)
          if (this.facturas == null && this.fac_proveedor[i].fcom_credito_contado) {
            this.fac_proveedor[i].fcom_estado = false
            console.log(this.fac_proveedor[i].fcom_estado)
          } else {
            this.fac_proveedor[i].fcom_estado = true
            console.log(this.fac_proveedor[i].fcom_estado)
          }
        }
      }, (error) => console.log(error)
    )//Metodo para buscar las facturas del proveedor

  }
  //CaRgr facturas de proveedoes
  //Cargar proveedor
  /* public cargarFac_Pagadas() {
    this.fac_comprasService.getFac_Pagadas().subscribe(
      (fac_proveedor: any) => {
        this.fac_proveedors = fac_proveedor
        console.log("Facturas de los proveedores--");
        console.log(this.fac_proveedors)
      }, (error) => console.log(error)
    )
  }
*/
}
