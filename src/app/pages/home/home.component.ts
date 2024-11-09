import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  //showIngresosEgresos: boolean = true; // Bandera para controlar la visibilidad del botón


  constructor(private router: Router) { }

  ngOnInit(): void {
    //const role_id = Number(localStorage.getItem('role_id'));

    // Verificar el role_id para decidir si mostrar el botón Ingresos - Egresos
    //if (role_id === 2) {
      //this.showIngresosEgresos = false;
    }

  }
