import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  customerService=inject(CustomerService);
  categoryList: Category[]=[];
  router = inject(Router);
  authService = inject(AuthService);
  productNum: number = 0;
  constructor(private productService: ProductService){
    productService.productObs.subscribe((product: number) => {
      this.productNum = product
      console.log(this.productNum);
    })
  }
  ngOnInit(){
    this.customerService.getCategories().subscribe((result) => {
      this.categoryList = result;
    })
  }

  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/products?" +e.target.value)
    }
  }

  searchCategory(id:string){
    this.router.navigateByUrl("/products?" + id!)
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
