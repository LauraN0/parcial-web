import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {
  usuario: any;

  constructor(private authService: AuthService, private router: Router) { }

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

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}