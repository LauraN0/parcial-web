import { Routes } from '@angular/router';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { AdminProductosComponent } from './componentes/admin-productos/admin-productos.component';
import { AdminClientesComponent } from './componentes/admin-clientes/admin-clientes.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CompraComponent } from './componentes/compra/compra.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'catalogo', component: CatalogoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'compra', component: CompraComponent },
    { path: 'admin/productos', component: AdminProductosComponent, canActivate: [AuthGuard], },
    { path: 'admin/clientes', component: AdminClientesComponent, canActivate: [AuthGuard], },
];