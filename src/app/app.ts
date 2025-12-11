import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <--- Importante para que funcione <router-outlet>
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'suro-stock';
}