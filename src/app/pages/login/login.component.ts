import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/core/services/LoginService/login-service.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public name: string = '';
  public password: string = '';


  public formLogin:FormGroup = this._initForm();

  constructor(private formBuilder: FormBuilder, 
    private router : Router,
    private loginService: LoginServiceService ) {
    
  };



  private _initForm(): FormGroup<any> {
    return this.formLogin = this.formBuilder.group({
      usu_name: ['', Validators.required ],
      usu_password: ['', Validators.required ]
    });
  }

  public async submitForm() {
    if (this.formLogin.value === "INVALID") {
      console.log("Formulario Invalido");
      return
    }

    const user = {
      usu_name: this.formLogin.value.usu_name,
      usu_password: this.formLogin.value.usu_password,
    }

    this.loginService.Login(user).subscribe({
      next: (Response: any) => {
        console.log(Response)
        if (Response.token){
          localStorage.setItem('token', Response.token)
          this.router.navigate(['/home'])
        }
        console.log(localStorage)
      },
      error: (err) => {
        Swal.fire({
          title: 'Error de inicio de sesión',
          text: 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });

        
      }
      
      
    })

  }

}
