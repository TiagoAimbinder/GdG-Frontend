import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons-menu',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NgIf, RouterLink],
  templateUrl: './buttons-menu.component.html',
  styleUrls: ['./buttons-menu.component.css']
})
export class ButtonsMenuComponent implements OnInit {

  public showDiv: string = ''; 
  showIngresosEgresos: boolean = true; // Bandera para controlar la visibilidad del botón


  constructor(private router: Router) { }; 

  ngOnInit(): void {
    this.showDiv = (this.router.url);

    const role_id = Number(localStorage.getItem('role_id'));

    // Verificar el role_id para decidir si mostrar el botón Ingresos - Egresos
    if (role_id === 2) {
      this.showIngresosEgresos = false;
    }
  }
}
