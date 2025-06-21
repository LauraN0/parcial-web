import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private URL = 'http://137.184.206.51:5000/api/usuarios';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    listarUsuarios(): Observable<any[]> {
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.authService.obtenerToken()}`
        );
        return this.http.get<any[]>(`${this.URL}/usuarios`, { headers });
    }

    eliminarUsuario(id: string): Observable<any> {
        return this.http.delete(`${this.URL}/${id}`);
    }
}