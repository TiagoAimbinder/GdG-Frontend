import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';

@Component({
  selector: 'app-create-manangement',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './create-manangement.component.html',
  styleUrls: ['./create-manangement.component.css']
})
export class CreateManangementComponent {


  constructor() {
    
  }; 
}
