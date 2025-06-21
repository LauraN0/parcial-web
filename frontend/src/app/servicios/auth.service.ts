import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL = 'http://137.184.206.51:5000/api/usuarios';

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

    estaAutenticado(): boolean {
        const token = this.obtenerToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp;
            const ahora = Math.floor(Date.now() / 1000);
            return exp > ahora;
        } catch (e) {
            return false;
        }
    }

    obtenerNombre(): string | null {
        return localStorage.getItem('nombre');
    }
}
