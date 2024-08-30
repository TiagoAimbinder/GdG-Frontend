import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UnitsSoldService } from 'src/app/core/services/UnitsSoldService/units-sold.service';



@Component({
  selector: 'app-units-sold',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule, NgIf, RouterLink],
  templateUrl: './units-sold.component.html',
  styleUrls: ['./units-sold.component.css']
})
export class UnitsSoldComponent {

  public showDiv: string = '';
  public showModalCreate: boolean = false;
  public formUnitsSoldCreate : FormGroup = this._initForm();
  public spinnerLoader: boolean = false;
  public users: any[] = [];




  constructor(private router: Router, private formBuilder: FormBuilder, private UnitsSoldService : UnitsSoldService) { }; 

  ngOnInit(): void {
    this.showDiv = (this.router.url);
  }

  private _initForm() : FormGroup<any> {
    return this.formBuilder.group({

    })

  }

  public returnUserName(usu_id: number): string {
    const name = this.users.find((usu: any) => usu.usu_id === usu_id);
    return name ? name.usu_name : 'Unknown';
  }

  public async submitFormCreate() {

    this.spinnerLoader = true;

    if (this.formUnitsSoldCreate.valid === false)  return this.spinnerLoader = false, this._alert(2, 'Error', 'Faltan campos por rellenar') ;

    const usu_id = Number(localStorage.getItem('usu_id'));

    const unitsSold = {
  
    }
    
    const result2 = (await this.UnitsSoldService.unitsSoldCreate(unitsSold)).subscribe({
      next: (data) => {
        this._alert(1, 'Categoria creada', 'Se creo la categoria correctamente');
        this.showModalCreate = false;
        this.spinnerLoader = false;
      },
      error: (err) => {
        this._alert(2, 'Error', 'No se pudo crear la categoria');
        console.log(err);
        this.spinnerLoader = false;
      }
    });
    
  }

  onClickCancel(){
    this.showModalCreate = false;
    this.formUnitsSoldCreate.reset();
  }

  private _alert = (type: number, title: string, text: string) => {
    Swal.fire({
      icon: type === 1 ? "success" : "error",
      title: title,
      text: text,
      color: "var(--main-color)",
      background: "var(--secondary-color)",
      confirmButtonColor: "var(--main-color)",
    });
  }
}
