import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { UnitsSoldService } from 'src/app/core/services/UnitsSoldService/units-sold.service';

@Component({
  selector: 'app-units-sold-history',
  standalone: true,
  imports: [CommonModule, NavbarComponent ],
  templateUrl: './units-sold-history.component.html',
  styleUrls: ['./units-sold-history.component.css']
})
export class UnitsSoldHistoryComponent implements OnInit{

  public saleHistoryFiltered: any[] = [];
  public saleHistory: any[] = [];

  constructor( private UnitsSoldService : UnitsSoldService) { }; 

  

  ngOnInit(): void {
    this._getAllCategories()
  }

  public _formatDate(fecha: string) {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
  }

  private _getAllCategories = async () => {

    const usu_id = Number(localStorage.getItem('usu_id'));

    (await this.UnitsSoldService.unitsSoldGetAll(usu_id)).subscribe({
      next: (data) => {
        this.saleHistory = data.sales;
        this.saleHistoryFiltered = data.sales;

        console.log(data.sales)

        // console.log(this.saleHistories)
        // console.log(data)

      },
      error: (err) => {
        console.error('Error fetching s:', err);
        this.saleHistory = [];
        this.saleHistoryFiltered = [];

      }
    });
  }

}
