import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class RegistroComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  registrar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, correo, contrasena } = this.formulario.value;

    this.authService.registrar({ nombre, correo, contrasena }).subscribe(
      (respuesta) => {
        console.log('Usuario registrado', respuesta);
        alert('Usuario registrado correctamente');
        this.formulario.reset();
      },
      (error) => {
        console.error('Error en el registro', error);
        alert('Ocurrió un error al registrar');
      }
    );
  }
}

/*
import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.html',
  styleUrls: ['./registro.scss']
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  registrar() {
    //this.authService.registrar(this.nombre, this.correo, this.contrasena).subscribe(
    this.authService.registrar({
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    }).subscribe(
      (respuesta) => {
        alert('Usuario registrado exitosamente ');
        this.router.navigate(['/login'])
      },
      (error) => {
        alert('Error en el registro')
        console.error(error);
      }
    );
  }
}
*/