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

  constructor(private router: Router) { }; 

  ngOnInit(): void {
    this.showDiv = (this.router.url);
  }
}
