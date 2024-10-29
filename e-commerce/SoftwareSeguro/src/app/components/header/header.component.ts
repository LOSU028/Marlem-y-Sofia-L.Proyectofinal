import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  customerService=inject(CustomerService);
  categoryList: Category[]=[];
  router = inject(Router);
  authService = inject(AuthService);
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
