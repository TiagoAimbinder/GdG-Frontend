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
    localStorage.setItem('usu_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRpYWdvIiwiaWF0IjoxNzE2MDg2MTc4LCJleHAiOjE3MTYwODk3Nzh9.QwjoDt4kmvut4JpScn26SBJg3WjqcZ5tTjmTS4CkWkQ');
  }
}
