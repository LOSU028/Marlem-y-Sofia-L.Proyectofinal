import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
@Input() product!: Product;
products: number = 0;
productService = inject(ProductService);
  addToCart(){
    this.productService.addCart();
  }
}
