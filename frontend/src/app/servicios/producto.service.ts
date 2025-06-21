import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {
    private URL = 'http://137.184.206.51:5000/api/productos';

    constructor(private http: HttpClient) { }

    obtenerProductos(): Observable<any[]> {
        return this.http.get<any[]>(this.URL);
    }

    crearProducto(data: FormData): Observable<any> {
        return this.http.post(this.URL, data);
    }

    editarProducto(id: string, data: any): Observable<any> {
        return this.http.put(`${this.URL}/${id}`, data);
    }

    eliminarProducto(id: string): Observable<any> {
        return this.http.delete(`${this.URL}/${id}`);
    }

    /* ----- STOCK ----- */
    disminuirStock(id: string): Observable<any> {
        return this.http.put(`${this.URL}/disminuir-stock/${id}`, {});
    }

    aumentarStock(id: string): Observable<any> {
        return this.http.put(`${this.URL}/aumentar-stock/${id}`, {});
    }
}