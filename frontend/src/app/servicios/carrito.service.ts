
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CarritoService {
    private carrito: any[] = [];

    agregarAlCarrito(producto: any) {
        this.carrito.push(producto);
    }

    obtenerCarrito(): any[] {
        return this.carrito;
    }

    vaciarCarrito() {
        this.carrito = [];
    }

    obtenerTotal(): number {
        return this.carrito.reduce((total, item) => total + item.precio, 0);
    }
}
