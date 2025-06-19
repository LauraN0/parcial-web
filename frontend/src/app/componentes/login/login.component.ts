import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  iniciarSesion() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { correo, contrasena } = this.formulario.value;

    this.authService.login(correo, contrasena).subscribe(
      (respuesta) => {
        console.log('Login exitoso', respuesta);

        const token = respuesta.token;
        this.authService.guardarToken(token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const rol = payload.rol;

        if (rol === 'admin') {
          this.router.navigate(['/admin/productos']);
        } else {
          this.router.navigate(['/catalogo']);
        }

        alert('Bienvenido');
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}