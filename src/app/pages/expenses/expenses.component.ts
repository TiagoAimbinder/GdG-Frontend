import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { ExpensesService } from 'src/app/core/services/ExpensesService/expenses.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from 'src/app/core/services/CategoriesService/categories.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseExpense, Expense } from 'src/app/core/models/expense.models';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {

  private cat_id:  number | null = null;
  public expenses: any = [];
  public category: any; 
  public expSelected: number | undefined;
  public modifyModal: boolean = false; 

  public showModal: boolean = false; 
  public formExpense: FormGroup = this._initForm();
  public spinnerLoader: boolean = false;

  constructor(private expensesService: ExpensesService, private formBuilder: FormBuilder,private categoriasService: CategoriesService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getExpenseId();
    this._getAllExpenses();
    this._getAllCategories();
  }

  private _initForm(): FormGroup<any> {
    return this.formBuilder.group({
      exp_name: ['', Validators.required],
      exp_amount: ['', Validators.required],
      exp_percentVta: ['', Validators.required],
    })
  }
  private _getAllExpenses = async () => {
    const result = (await this.expensesService.getAllExpenses()).subscribe({
      next: (res) => {
        console.log('asd', res)
        this.expenses = res.expenses.filter((exp: any) => exp.cat_id === this.cat_id);
      },
      error: (err) => {
        this._alert(2, "Error", "Error al traer los items de la categoría. Por favor, intente más tarde.");
        console.error(err);
      }
    })
  }

  private _getAllCategories = async () => {
    const result = (await this.categoriasService.getAllCategories()).subscribe({
      next: (res) => {
        this.category = res.categories.find((cat: any) => this.cat_id === cat.cat_id);
      },
      error: (err) => {
        this._alert(2, "Error", "Error al traer las categorías. Por favor, intente más tarde.");
        console.error(err);
      }
    })
  }

  private _getExpenseId = (): void => {
    this.route.paramMap.subscribe(params => {
      this.cat_id = Number( params.get('cat_id'));
    });
  }

  public calcVta(amount: number, percent: number) {
    return ((amount * percent)/100) + amount;
  };



  // ---------------- Acciones -------------------
  public onClickModify(exp_id: number): void {
    this.expSelected = exp_id;
    this.modifyModal = true; 
    this.showModal = true;
    this.formExpense.patchValue({
      exp_name: this.expenses.find((exp: any) => exp.exp_id === exp_id).exp_name,
      exp_amount: this.expenses.find((exp: any) => exp.exp_id === exp_id).exp_amount,
      exp_percentVta: this.expenses.find((exp: any) => exp.exp_id === exp_id).exp_percentVta
    });
  }



  public onClickCreate(): void {
    this.showModal = true;
  }

  public onClickCancel(): void {
    this.showModal = false;
    this.formExpense.reset();
    this.modifyModal = false; 
  }

  onClickDelete(exp_id: number, exp_name: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar el gasto ${exp_name}`,
      icon: "warning",
      background: 'var(--secondary-color)',
      color: 'var(--light-color)',
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: 'var(--main-color)',
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = (await this.expensesService.deleteExpense(exp_id)).subscribe({
          next: (data) => {
            this._getAllExpenses();
            this._alert(1, "Eliminado", "El gasto ha sido eliminado correctamente.");
          },
          error: (err) => {
            console.error('Error al eliminar el gasto: ', err);
            this._alert(2, "Error", "Error al intentar eliminar el gasto, intente más tarde");
          }
        })
      }
    });
  }

  public async submitForm(type: number) {
    
    this.spinnerLoader = true;

    if (this.formExpense.valid === false)  return  this.spinnerLoader = false, this._alert(2, 'Error', 'Faltan campos por rellenar') ;
    if (this.formExpense.value.exp_amount <= 0) return  this.spinnerLoader = false, this._alert(2, 'Error', 'El monto no puede ser negativo o cero'); 

    const usu_id = Number(localStorage.getItem('usu_id'))
    const expense: BaseExpense | Expense = {
      exp_name: this.formExpense.value.exp_name,
      exp_amount: this.formExpense.value.exp_amount,
      exp_percentVta: this.formExpense.value.exp_percentVta,
      cat_id: this.cat_id,
    };

    // ---- Crear gasto: 
    if (type === 1) {
      (expense as Expense).usu_id = usu_id;
      const result = (await this.expensesService.createExpense(expense)).subscribe({
        next: (data) => {
          this.formExpense.reset();
          this._alert(1, 'Gasto creado correctamente', '')
          this._getAllExpenses();
          this.showModal = false;
        },
        error: (err) => {
          this._alert(2, "Error", "Error al crear el gasto, intentelo más tarde.");
          console.error(err);
        }
      })
    } 

    // ---- Modificar gasto: 
    if (type === 2) {
      const result = (await this.expensesService.updateExpense(expense, this.expSelected!)).subscribe({
        next: (data) => {
          this.formExpense.reset();
          this._alert(1, 'Gasto actualizado correctamente', '')
          this._getAllExpenses();
          this.showModal = false;
        },
        error: (err) => {
          this._alert(2, "Error", "Error al actualizar el gasto, intentelo más tarde.");
          console.error(err);
        }
      })
    }
    this.modifyModal = false; 
    this.spinnerLoader = false;
  };

  public formatCurrency() {
    let inputValue = this.formExpense.get('exp_amount')!.value;
    if (inputValue === null) {
      return; 
    }
  
    inputValue = parseFloat(inputValue).toFixed(2);
    inputValue = inputValue.replace(',', '.');
    this.formExpense.patchValue({ exp_amount: inputValue }, { emitEvent: false });
  };

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
