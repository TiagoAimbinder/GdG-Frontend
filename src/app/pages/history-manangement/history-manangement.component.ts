import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { ManangementServiceService } from 'src/app/core/services/ManangementService/manangement-service.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/core/services/UserService/user.service';
import { CurrencyService } from 'src/app/core/services/CurrencyService/currency.service';
import { Currency, CurrencyTotal } from 'src/app/core/models/currency.models';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-history-manangement',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './history-manangement.component.html',
  styleUrls: ['./history-manangement.component.css']
})
export class HistoryManangementComponent implements OnInit {

  public manangementHistory: any[] = [];
  public manangementHistoryFiltered: any[] = [];

  public users: any[] = [];
  public currencyTypes: Currency[] = [];

  // Seteo de array para sumar o restar según el movimiento
  public totalAmount: CurrencyTotal[] = [];  

  // Formulario de busqueda:
  public formTable = this._initFormSearch();

  public movementType: string = 'Movimiento';
  public currencyType: string = 'Moneda';

  constructor(private formBuilder: FormBuilder, private manangementService: ManangementServiceService, private userService: UserService, private currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this._getAllCurrencyTypes();
  }

  private _getAllManangement = async () => {
    (await this.manangementService.getAllManangement()).subscribe({
      next: (data) => {
        this.manangementHistory = data.manangement; 
        this.manangementHistoryFiltered = data.manangement; 
        this._calcTotalAmount();
      },
      error: (err) => {
        console.error(err); 
        this._alert(2, "Error", "Error al obtener los movimientos, intentelo de nuevo más tarde");
      }
    }) 
  }

  private _getAllUsers = async () => {
    (await this.userService.getAllUsers()).subscribe({
      next: (data) => {
        this.users = data.users;
        this._getAllManangement();
      }, 
      error: (err) => {
        console.error(err);
        this._alert(2, 'Error', 'Error al obtener los usuarios, intentelo de nuevo más tarde');
      }
    })
  };

  private _getAllCurrencyTypes = async () => {
    (await this.currencyService.getAllCurrency()).subscribe({
      next: (data) => {
        this.currencyTypes = data.currency;
        this.totalAmount = this.currencyTypes.map((cur: Currency) => ({ cur_id: cur.cur_id, cur_name: cur.cur_name, total: 0,}))
        this._getAllUsers();

      }, 
      error: (err) => {
        console.error(err);
        this._alert(2, 'Error', 'Error al obtener los tipos de monedas, intentelo de nuevo más tarde');
      }
    })
  };

  private _calcTotalAmount = () => {
    this.manangementHistory.forEach((manangement) => {

      // Comprobación de que esté activada: 
      if (manangement.his_status !== true) return; 

      this.totalAmount = this.totalAmount.map((ct: any) => {
        if (ct.cur_id === manangement.cur_id) {
          if (manangement.his_type === "Ingreso") ct.total += manangement.his_amount;
          else ct.total -= manangement.his_amount;
        };
        return ct;
      })
    })

  } 

   // ---------- SEARCH INPUT ---------- 
  private _initFormSearch(): FormGroup {
    return this.formBuilder.group({
      searchInput: ['', Validators.required ]
    })
  }

  // ---- Method: Search filter  
  public tableFilter(mt: string, ct: string) {
    // if (this.formTable.value.searchInput === '' && mt === 'Movimiento' && ct === 'Moneda') {
    //   this.manangementHistoryFiltered = this.manangementHistory;
    //   return; 
    // }

    const items = this.manangementHistory.filter( (item:any) => {

      // Filtrar por tipo de movimiento:
      const isTypeMatch = mt === 'Movimiento' ? (item.his_type === 'Ingreso' || item.his_type === 'Egreso') : item.his_type === mt;

      // Filtrar por tipo de moneda:
      const isCurrencyMatch = ct === 'Moneda' ? true : this.currencyTypes.some(cur => cur.cur_name === ct && cur.cur_id === item.cur_id)  

      // Filtrar por fecha:
      const isDescriptionMatch = item.his_description.toLowerCase().includes(this.formTable.value.searchInput.toLowerCase());

      return isTypeMatch && isCurrencyMatch && isDescriptionMatch;
    })

    this.manangementHistoryFiltered = items;
  };

  public filterType(mt: string) {
    mt === 'Movimiento' ? this.movementType = 'Ingreso' : mt === 'Ingreso' ? this.movementType = 'Egreso' : this.movementType = 'Movimiento';
  };

  public filterCurrency(ct: string) {
    if (ct === 'Moneda') return this.currencyType =  this.currencyTypes[0].cur_name;
    const index = this.currencyTypes.findIndex( (cur: any) => {return cur.cur_name === ct;});
    if (index === this.currencyTypes.length - 1) return this.currencyType = 'Moneda';
    return this.currencyType = this.currencyTypes[index+1].cur_name;
    
  };

  // ---------- END INPUT ---------- 

  /* -------------- TABLE -------------- */
  public returnCurrencyName(cur_id: number): string {
    const currency = this.currencyTypes.find((cur: any) => cur.cur_id === cur_id);
    return currency ? currency.cur_name : 'Unknown';
  }

  public returnUserName(usu_id: number): string {
    const name = this.users.find((usu: any) => usu.usu_id === usu_id);
    return name ? name.usu_name : 'Unknown';
  }

  public formatDate(date: Date): string {
    const newDate = new Date(date);

    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; 
    const year = newDate.getFullYear() % 100; 

    return `${day}/${month < 10 ? '0' : ''}${month}/20${year < 10 ? '0' : ''}${year}`;
  }
  
  public onClickDelete = async(his_id: number, his_amount: number, his_type: string) => {
    Swal.fire({
      icon: 'warning',
      background: 'var(--secondary-color)',
      color: 'var(--main-color)'

    })

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás por eliminar el $${his_type} con un monto de ${his_amount}`,
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
        const result = (await this.manangementService.deleteManangement(his_id)).subscribe({
          next: (data) => {
            this.totalAmount = this.currencyTypes.map((cur: Currency) => ({ cur_id: cur.cur_id, cur_name: cur.cur_name, total: 0,}))
            this._getAllManangement();
            this._alert(1, "Eliminado", "El movimiento ha sido eliminado correctamente.");
          },
          error: (err) => {
            console.error('Error al eliminar el movimiento: ', err);
            this._alert(2, "Error", "Error al intentar eliminar el movimiento, intente más tarde");
          }
        })

      }
    });
    
  };

  public onClickModify(his_id: number) {

  };

  private _alert = (type: number, title: string, text: string) => {
    Swal.fire({
      icon: type === 1 ? "success" : "error",
      title: title,
      text: text,
      color: "var(--light-color)",
      background: "var(--secondary-color)",
      confirmButtonColor: "var(--main-color)",
    });
  }
}






