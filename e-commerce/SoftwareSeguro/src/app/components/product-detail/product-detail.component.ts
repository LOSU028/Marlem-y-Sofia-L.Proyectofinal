import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.customerService.getProductById(id).subscribe((result) => {
      this.product= result;
      console.log(this.product);
    })
  }
}
