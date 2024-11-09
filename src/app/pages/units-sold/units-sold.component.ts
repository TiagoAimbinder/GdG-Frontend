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
  public fecha: any;
  public saleHistories : any[] = [] ;


  constructor(private router: Router, private formBuilder: FormBuilder, private UnitsSoldService : UnitsSoldService) { }; 

  ngOnInit(): void {
    this.showDiv = (this.router.url);
    console.log(this.showDiv)
    this._getAllCategories()
  }

  private _initForm() : FormGroup<any> {
    return this.formBuilder.group({

      sal_name: ['', Validators.required],
      sal_quantity: ['' , Validators.required],
      sal_type: [null, Validators.required]

    })

  }

  public returnUserName(usu_id: number): string {
    const name = this.users.find((usu: any) => usu.usu_id === usu_id);
    return name ? name.usu_name : 'Unknown';
  }



  
  private _getAllCategories = async () => {

    const usu_id = Number(localStorage.getItem('usu_id'));

    (await this.UnitsSoldService.unitsSoldGetAll(usu_id)).subscribe({
      next: (data) => {
        this.saleHistories = data.sales;
        // console.log(this.saleHistories)
        // console.log(data)

      },
      error: (err) => {
        console.error('Error fetching s:', err);
        this.saleHistories = [];
      }
    });
  }

  

  public async submitFormCreate() {

    this.spinnerLoader = true;

    if (this.formUnitsSoldCreate.valid === false)  return this.spinnerLoader = false, this._alert(2, 'Error', 'Faltan campos por rellenar') ;

    const usu_id = Number(localStorage.getItem('usu_id'));

    const unitsSold = {
      usu_id: usu_id, 
      sal_name: this.formUnitsSoldCreate.value.sal_name,
      sal_quantity: this.formUnitsSoldCreate.value.sal_quantity,
      sal_type: this.formUnitsSoldCreate.value.sal_type
  
    }
    
    const result2 = (await this.UnitsSoldService.unitsSoldCreate(unitsSold)).subscribe({
      next: (data) => {
        this._alert(1, 'Venta creada', 'Se creo la venta correctamente');
        this.showModalCreate = false;
        this.spinnerLoader = false;
        this._resetForm();
      },
      error: (err) => {
        this._alert(2, 'Error', 'No se pudo crear la venta');
        console.log(err);
        this.spinnerLoader = false;
      }
    });
    
  }

  public _formatDate() {
    const date = new Date; 
    this.fecha = date; 
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
  }

  onClickAddSale(){
    this.showModalCreate = true;
    this.formUnitsSoldCreate.reset ({
      sal_date: this._formatDate()
    })
  }


  onClickCancel(){
    this.showModalCreate = false;
    this.formUnitsSoldCreate.reset();
  }

  private _resetForm() {
    this.formUnitsSoldCreate.reset({
      sal_date: this._formatDate(),
      sal_quantity: '',
      sal_name: '',
    });
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
