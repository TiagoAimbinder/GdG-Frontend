import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManangementServiceService } from 'src/app/core/services/ManangementService/manangement-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-manangement',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './create-manangement.component.html',
  styleUrls: ['./create-manangement.component.css']
})
export class CreateManangementComponent {

  public spanType: string = '';
  public spanTypeCurrency: string = '';

  public formManangement: FormGroup = this._initForm();


  public fecha: any; 

  constructor(private formBuilder: FormBuilder, private manangementService: ManangementServiceService) {
    
  };
  
  private _initForm(): FormGroup<any> {
    return this.formManangement = this.formBuilder.group({
      his_date: [this._formatDate(), Validators.required],
      his_amount: ['', Validators.required],
      his_description: ['', Validators.required],
      cur_id: [null,Validators.required],
      his_type: [null,Validators.required]
    })
  }

  public async submitForm() {

    if (this.formManangement.value === "INVALID") {
      console.log("Formulario invalido");
    }

    const manangement = {
      his_date: this.fecha,
      his_amount: Number(this.formManangement.value.his_amount),
      his_description: this.formManangement.value.his_description,
      his_type: "Egreso",
      cur_id: 1,
      usu_id: 1,
    }

    console.log(manangement);

    const result = (await this.manangementService.createManangement(manangement)).subscribe({
      next: (data) => { 
        Swal.fire({
          icon: "success",
          title: "Movimiento creado correctamente",
          color: "var(--main-color)",
          background: "var(--secondary-color)" 
        });
      },
      error: (err) => {
        Swal.fire('Chino DOWN', 'LO CREASTE MAL RE DOWN', 'error');
      }
    })

  }; 

  private _formatDate() {
    const date = new Date; 
    this.fecha = date; 
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
  }

  public onClickType(type: number) {
    if (type === 1) { this.spanType = "Ingreso"; }
    if (type === 2) { this.spanType = "Egreso"; }
  
    this.formManangement.get('his_type')?.setValue(type);

  }

  public onClickCurrency(id: number) {
    if (id === 1) { this.spanTypeCurrency = "ARS"; }
    if (id === 2) { this.spanTypeCurrency = "USD"; }  

    this.formManangement.get('cur_id')?.setValue(id);

  }; 


  public formatCurrency() {

    let inputValue = this.formManangement.get('his_amount')!.value;
    if (inputValue === null) {
      return; 
    }
  
    inputValue = parseFloat(inputValue).toFixed(2);
    inputValue = inputValue.replace(',', '.');
    this.formManangement.patchValue({ his_amount: inputValue }, { emitEvent: false });

  };
}

