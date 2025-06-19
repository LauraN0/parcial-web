import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../servicios/carrito.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './compra.html',
  styleUrls: ['./compra.scss']
})
export class CompraComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  compraFinalizada: boolean = false;

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carrito.reduce((suma, item) => suma + item.precio, 0);
  }

  finalizarCompra(): void {
    this.compraFinalizada = true;
    this.carritoService.vaciarCarrito();
    this.carrito = [];
    this.total = 0;
  }
}