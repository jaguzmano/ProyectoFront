import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//importamos
//Importar el Cabeceracomponent para la redireccion de pagina html
import { CabeceraComponent } from './components/cabecera/cabecera.component';
//Importamos detalleComponent para para la redireccion de pagina html
import { DetalleComponent } from './components/detalle/detalle.component';
//importar vista cabecera detalle-
import { VistaCabDetComponent } from './components/vista-cab-det/vista-cab-det.component';
import { ObjCabComponent } from './components/obj-cab/obj-cab.component';
import { ObjDetComponent } from './components/obj-det/obj-det.component';
import { FacComprasComponent } from './components/fac-compras/fac-compras.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { DetalleComprasComponent } from './components/detalle-compras/detalle-compras.component';
import { VistaMaesDetaComponent } from './components/vista-maes-deta/vista-maes-deta.component';
import { ProductoComponent } from './components/producto/producto.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'fac_compras',component:FacComprasComponent},
  {path:'proveedor',component:ProveedorComponent},
  {path:'producto',component:ProductoComponent},
  {path:'Detalle_compras',component:DetalleComprasComponent},
  {path:'Detalle_compras',component:DetalleComprasComponent},
  {path:'vista-maes-deta/:pro_cedula_ruc/:fcom_id',component:VistaMaesDetaComponent},
  {path:'inicio',component:InicioComponent },

  {path:'cabecera',component:CabeceraComponent},
  {path:'detalle/:cli_codigo',component:DetalleComponent},
  {path:'vista-cab-det/:cli_codigo/:com_codigo',component:VistaCabDetComponent},
  {path:'cliente',component:ObjCabComponent},
  {path:'auto',component:ObjDetComponent },
  
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
