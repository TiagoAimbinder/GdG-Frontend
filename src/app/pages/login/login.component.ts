import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/core/services/LoginService/login-service.service';
import Swal from 'sweetalert2';


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

  public btndisabled: boolean = false;

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

    this.btndisabled = true;

    if (this.formLogin.valid === false) {

      this.btndisabled = false;

      Swal.fire({
        background: 'var(--secondary-color)',
        color: 'var(--light-color)',
        confirmButtonColor: 'var(--main-color)',
        title: 'Error de inicio de sesión',
        text: 'Faltan campos por rellenar',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });

      return
    }

    const user = {
      usu_name: this.formLogin.value.usu_name,
      usu_password: this.formLogin.value.usu_password,
    }

    this.loginService.Login(user).subscribe({
      next: (Response: any) => {
        this.btndisabled = false;
        localStorage.setItem('usu_token', Response.usu_token);
        localStorage.setItem('usu_id', Response.usu_id);
        localStorage.setItem('role_id', Response.role_id);

        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.btndisabled = false;
        Swal.fire({
          background: 'var(--secondary-color)',
          color: 'var(--light-color)',
          confirmButtonColor: 'var(--main-color)',
          title: 'Error de inicio de sesión',
          text: 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.',
          icon: 'error',
          confirmButtonText: 'Entendido'
        });
      }
    })


  }

}

