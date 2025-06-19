import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.scss']
})


export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  // Cargar los productos del carrito desde el localStorage
  cargarCarrito(): void {
    const datos = localStorage.getItem('carrito');
    this.carrito = datos ? JSON.parse(datos) : [];
  }

  eliminarDelCarrito(producto: any) {
    if (confirm('¿Deseas eliminar este producto del carrito?')) {
      this.carrito = this.carrito.filter(p => p._id !== producto._id);
      localStorage.setItem('carrito', JSON.stringify(this.carrito));

      this.productoService.aumentarStock(producto._id).subscribe({
        next: () => {
          alert('Producto eliminado del carrito y stock actualizado');
          this.cargarCarrito();
        },
        error: () => {
          alert('Ocurrió un error al aumentar el stock');
        }
      });
    }
  }

  // Obtener el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Finalizar la compra (limpiar carrito)
  finalizarCompra(): void {
    localStorage.removeItem('carrito');
    this.carrito = [];
    alert('¡Compra finalizada!');
  }

  RealizarCompra() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Vaciar el carrito
    this.carrito = [];
    localStorage.removeItem('carrito');

    alert('✅ ¡Compra realizada con éxito!\n\n🧾 Fecha y hora: ' + new Date().toLocaleString() + '\n📦 Los productos han sido procesados.\n🧹 El carrito se vació correctamente.\n\n🎉 ¡Gracias por tu compra!');
  }
}


