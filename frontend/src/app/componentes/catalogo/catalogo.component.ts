import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService } from '../../servicios/carrito.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.scss']
})
export class CatalogoComponent implements OnInit {
  productos: any[] = [];
  carrito: any[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (respuesta) => {
        this.productos = respuesta;
        console.log('Productos cargados', this.productos);
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  agregarAlCarrito(producto: any) {
    if (producto.stock <= 0) {
      alert('No hay stock disponible');
      return;
    }

    // Disminuir el stock en backend
    this.productoService.disminuirStock(producto._id).subscribe({
      next: (res) => {
        // ↓ Actualizar stock local
        producto.stock -= 1;

        // ↓ Agregar al carrito
        let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        const existente = carrito.find((item: any) => item._id === producto._id);

        if (existente) {
          existente.cantidad += 1;
        } else {
          carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));

        alert('Producto agregado al carrito');
      },
      error: (err) => {
        console.error(err);
        alert('No se pudo actualizar el stock');
      }
    });
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          this.productos = this.productos.filter(p => p._id !== id);
          alert('Producto eliminado correctamente');
        },
        (error) => {
          console.error('Error al eliminar producto', error);
          alert('Error al eliminar el producto');
        }
      );
    }
  }

  editarProducto(producto: any): void {
    const data = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock
    };

    this.productoService.editarProducto(producto._id, data).subscribe(
      () => {
        alert('Producto actualizado correctamente');
      },
      (error) => {
        console.error('Error al actualizar producto', error);
        alert('No se pudo actualizar el producto');
      }
    );
  }
}
