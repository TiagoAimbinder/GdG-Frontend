import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { ExpensesService } from 'src/app/core/services/ExpensesService/expenses.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})

export class ExpensesComponent implements OnInit {

  constructor(private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  private getAllExpenses = async () => {
    const result = (await this.expensesService.getAllExpenses()).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
