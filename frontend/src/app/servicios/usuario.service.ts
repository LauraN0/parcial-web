import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = `${environment.apiUrl}/api/usuarios`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    listarUsuarios(): Observable<any[]> {
        const headers = new HttpHeaders().set(
            'Authorization',
            `Bearer ${this.authService.obtenerToken()}`
        );
        return this.http.get<any[]>(`${this.apiUrl}/usuarios`, { headers });
    }

    eliminarUsuario(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
