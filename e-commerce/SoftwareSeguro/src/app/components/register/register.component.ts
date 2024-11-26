import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
authService = inject(AuthService)
formBuilder=inject(FormBuilder);
router = inject(Router);
registerForm = this.formBuilder.group({
  name: ['',[Validators.required]],
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]]
})

  register(){
    let value = this.registerForm.value
    this.authService.register(value.name!,value.email!,value.password!).subscribe(result =>{
      alert("User registered");
      this.router.navigateByUrl("/login");
    })    
  }

}
