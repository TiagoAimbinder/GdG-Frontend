import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { ExpensesService } from 'src/app/core/services/ExpensesService/expenses.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriesService } from 'src/app/core/services/CategoriesService/categories.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {

  private cat_id:  number | null = null;
  public expenses: any = [];
  public category: any; 

  constructor(private expensesService: ExpensesService, private categoriasService: CategoriesService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getExpenseId();
    this._getAllExpenses();
    this._getAllCategories();
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
  onClickModify() {}
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
