import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.obtenerToken();

  if (token) {
    return true;
  } else {
    alert('Acceso denegado. Inicia sesión para continuar.');
    router.navigate(['/login']);
    return false;
  }
};