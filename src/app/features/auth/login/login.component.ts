import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// Concept: standalone, FormsModule, two-way binding [(ngModel)], event binding, *ngIf, Router.navigate
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Concept: two-way binding properties
  email: string = '';
  password: string = '';
  showError: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;

  // Users list
  private readonly USERS = [
    { email: 'admin@manlog.com', password: '123', route: '/admin' },
    { email: 'procurement@manlog.com', password: '123', route: '/procurement' },
    { email: 'supplier@manlog.com', password: '123', route: '/supplier' },
    { email: 'dc@manlog.com', password: '123', route: '/distribution' }
  ];

  // Concept: Router injected via constructor
  constructor(private router: Router) { }

  // Concept: event binding (ngSubmit), Router.navigate
  onLogin(): void {
    this.loading = true;
    this.showError = false;

    // Simulate a tiny async delay so the concept is visible
    setTimeout(() => {
      const user = this.USERS.find(
        u => u.email === this.email.trim() && u.password === this.password
      );

      if (user) {
        this.router.navigate([user.route]);
      } else {
        this.showError = true;
        this.loading = false;
      }
    }, 600);
  }
}
