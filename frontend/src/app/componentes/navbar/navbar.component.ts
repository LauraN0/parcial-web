import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  usuario: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    const token = this.authService.obtenerToken();
    const rol = localStorage.getItem('rol');
    const nombre = this.authService.obtenerNombre(); 

    if (token) {
      this.usuario = {
        rol: rol || 'cliente',
        nombre: nombre || 'Usuario'
      };
    }
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}