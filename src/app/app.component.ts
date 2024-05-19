import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'GdG-Frontend';


  constructor() {
    localStorage.setItem('usu_id', '1');
    localStorage.setItem('usu_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRpYWdvIiwiaWF0IjoxNzE2MTQzMzAyLCJleHAiOjE3MTYxNDY5MDJ9.uQb0SO80t4qXksMkxXAi0tWOV9vDng7kezuOL4QLBI0');
  }
}
