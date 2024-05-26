import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  public navbarName = 'Eddie Burguers'; 

  constructor (private router: Router) {
  }

  ngOnInit(): void {
    this.navbarName = this._getNameByRoute(this.router.url);    
  } 


  private _getNameByRoute(url: string): string{
    if(url === '/login') return '';
    if(url === '/gestion') return 'Ingresos | Egresos';
    if(url === '/gestion/crear') return 'Crear - Ingresos | Egresos';
    if(url === '/gestion/historial') return 'Historial - Ingresos | Egresos';
    if(url === '/categoria') return 'Categorias';
    
    return 'Eddie Burguers'
  }
}
