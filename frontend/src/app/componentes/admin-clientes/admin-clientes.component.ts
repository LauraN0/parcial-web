import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-clientes.html',
  styleUrls: ['./admin-clientes.scss']
})
export class AdminClientesComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = this.authService.obtenerToken();
    if (!token) {
      alert('Acceso denegado');
      this.router.navigate(['/login']);
      return;
    }

    this.usuarioService.listarUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        alert('No se pudieron cargar los usuarios');
      }
    );
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => {
        this.usuarios = this.usuarios.filter(usuario => usuario._id !== id);
        alert('Usuario eliminado');
      });
    }
  }
}