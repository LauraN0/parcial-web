import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL = 'http://localhost:5000/api/usuarios';

    constructor(private http: HttpClient) { }

    registrar(data: any): Observable<any> {
        return this.http.post(`${this.URL}/registrar`, data);
    }

    login(correo: string, contrasena: string): Observable<any> {
        return this.http.post(`${this.URL}/login`, { correo, contrasena }).pipe(
            tap((respuesta: any) => {
                localStorage.setItem('token', respuesta.token);
                localStorage.setItem('rol', respuesta.usuario.rol);
                localStorage.setItem('nombre', respuesta.usuario.nombre); 
            })
        );
    }

    guardarToken(token: string): void {
        localStorage.setItem('token', token);
    }

    obtenerToken(): string | null {
        return localStorage.getItem('token');
    }

    cerrarSesion(): void {
        localStorage.removeItem('token');
    }

    obtenerRol(): string | null {
        const token = this.obtenerToken();
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.rol;
    }

    obtenerNombre(): string | null {
        return localStorage.getItem('nombre');
    }
}