import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { VistaCabDetComponent } from './components/vista-cab-det/vista-cab-det.component';
import { ObjCabComponent } from './components/obj-cab/obj-cab.component';
import { ObjDetComponent } from './components/obj-det/obj-det.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { FacComprasComponent } from './components/fac-compras/fac-compras.component';
import { DetalleComprasComponent } from './components/detalle-compras/detalle-compras.component';
import { ProductoComponent } from './components/producto/producto.component';
import { VistaMaesDetaComponent } from './components/vista-maes-deta/vista-maes-deta.component';
import { PruebaComponent } from './components/prueba/prueba.component';


@NgModule({
  declarations: [
    
    AppComponent,
    CabeceraComponent,
    DetalleComponent,
    VistaCabDetComponent,
    ObjCabComponent,
    ObjDetComponent,
    ProveedorComponent,
    FacComprasComponent,
    DetalleComprasComponent,
    ProductoComponent,
    VistaMaesDetaComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
