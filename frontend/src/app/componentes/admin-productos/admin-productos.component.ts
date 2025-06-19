import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.scss']
})

export class AdminProductosComponent implements OnInit {
  producto: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: '',
    stock: 0
  };
  archivo: File | null = null;
  productos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  cambiarImagen(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      this.producto.imagen = archivo;
    }
  }

  seleccionarProducto(producto: any) {
    this.producto = { ...producto };
  }

  seleccionarArchivo(event: any) {
    this.archivo = event.target.files[0];
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: datos => this.productos = datos,
      error: () => alert('Error al cargar productos')
    });
  }

  guardarProducto() {
    const formData = new FormData();
    Object.entries(this.producto).forEach(([key, val]) => formData.append(key, val as any));
    if (this.archivo) formData.append('imagen', this.archivo);

    const peticion = this.producto._id
      ? this.productoService.editarProducto(this.producto._id, formData)
      : this.productoService.crearProducto(formData);

    peticion.subscribe({
      next: () => {
        alert(this.producto._id ? 'Producto actualizado' : 'Producto creado');
        this.obtenerProductos();
        this.producto = { nombre: '', descripcion: '', precio: 0, categoria: '', stock: 0 };
        this.archivo = null;
      },
      error: () => alert('Error al guardar producto')
    });
  }

  editarProducto(producto: any) {
    this.producto = { ...producto };
  }

  eliminarProducto(id: string) {
    if (!confirm('¿Eliminar este producto?')) return;
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        alert('Producto eliminado');
        this.obtenerProductos();
      },
      error: () => alert('Error al eliminar producto')
    });
  }
}