import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// Concept: standalone, FormsModule, two-way binding [(ngModel)], event binding, *ngIf, Router.navigate
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="login-wrapper">

      <!-- Left panel — branding -->
      <div class="login-brand">
        <div class="brand-content">
          <div class="brand-logo">
            <i class="bi bi-boxes"></i>
          </div>
          <h1 class="brand-name">ManLog</h1>
          <p class="brand-tagline">Manufacturing Logistics, Unified.</p>
          <div class="brand-modules">
            <span><i class="bi bi-cart-check"></i> Procurement</span>
            <span><i class="bi bi-people"></i> Supplier</span>
            <span><i class="bi bi-truck"></i> Distribution</span>
          </div>
        </div>
      </div>

      <!-- Right panel — login form -->
      <div class="login-form-panel">
        <div class="login-card">
          <h2 class="login-title">Welcome back</h2>
          <p class="login-subtitle">Sign in to your ManLog account</p>

          <!-- Error message: Concept *ngIf -->
          <div class="alert-error" *ngIf="showError">
            <i class="bi bi-exclamation-circle"></i>
            Invalid email or password. Please try again.
          </div>

          <form (ngSubmit)="onLogin()" #loginForm="ngForm">

            <!-- Email: Concept [(ngModel)] two-way binding -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrapper">
                <i class="bi bi-envelope input-icon"></i>
                <input
                  id="email"
                  type="email"
                  name="email"
                  [(ngModel)]="email"
                  placeholder="admin@manlog.com"
                  required
                  autocomplete="email"
                />
              </div>
            </div>

            <!-- Password: Concept [(ngModel)] two-way binding -->
            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <i class="bi bi-lock input-icon"></i>
                <input
                  id="password"
                  [type]="showPassword ? 'text' : 'password'"
                  name="password"
                  [(ngModel)]="password"
                  placeholder="Enter your password"
                  required
                  autocomplete="current-password"
                />
                <!-- Event binding (click) -->
                <button
                  type="button"
                  class="toggle-password"
                  (click)="showPassword = !showPassword"
                  [title]="showPassword ? 'Hide password' : 'Show password'">
                  <i [class]="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>

            <!-- Submit: Concept (ngSubmit) event binding -->
            <button type="submit" class="btn-login" id="btn-login">
              <span *ngIf="!loading">Sign In</span>
              <span *ngIf="loading"><i class="bi bi-arrow-repeat spin"></i> Signing in…</span>
            </button>

          </form>

          <p class="login-hint">
            <i class="bi bi-info-circle"></i>
            Demo — use <strong>admin&#64;manlog.com</strong> / <strong>123</strong>
          </p>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* ── Layout ── */
    .login-wrapper {
      display: flex;
      min-height: 100vh;
    }

    /* ── Left branding panel ── */
    .login-brand {
      width: 45%;
      background: linear-gradient(145deg, #0f172a 0%, #1e3a5f 60%, #1a56db 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      position: relative;
      overflow: hidden;
    }
    .login-brand::before {
      content: '';
      position: absolute;
      width: 400px; height: 400px;
      border-radius: 50%;
      background: rgba(26,86,219,0.15);
      top: -100px; right: -100px;
    }
    .login-brand::after {
      content: '';
      position: absolute;
      width: 250px; height: 250px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      bottom: 60px; left: -60px;
    }
    .brand-content { color: #fff; text-align: center; z-index: 1; }
    .brand-logo {
      font-size: 4rem;
      margin-bottom: 1rem;
      color: #60a5fa;
    }
    .brand-name {
      font-size: 3rem;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: .5rem;
    }
    .brand-tagline {
      font-size: 1.1rem;
      opacity: .75;
      margin-bottom: 2.5rem;
    }
    .brand-modules {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .brand-modules span {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 20px;
      padding: .35rem 1rem;
      font-size: .85rem;
      backdrop-filter: blur(4px);
      display: flex;
      gap: .4rem;
      align-items: center;
    }

    /* ── Right form panel ── */
    .login-form-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 2rem;
    }
    .login-card {
      background: #fff;
      border-radius: 16px;
      padding: 2.5rem 2.5rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    }
    .login-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: .25rem;
    }
    .login-subtitle {
      color: #64748b;
      font-size: .95rem;
      margin-bottom: 1.75rem;
    }

    /* ── Error ── */
    .alert-error {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      border-radius: 8px;
      padding: .75rem 1rem;
      margin-bottom: 1.25rem;
      font-size: .9rem;
      display: flex;
      gap: .5rem;
      align-items: center;
      animation: shake .3s ease;
    }
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      25%      { transform: translateX(-6px); }
      75%      { transform: translateX(6px); }
    }

    /* ── Form ── */
    .form-group { margin-bottom: 1.25rem; }
    .form-group label {
      display: block;
      font-size: .85rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: .5rem;
    }
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: .9rem;
      color: #9ca3af;
      font-size: 1rem;
      pointer-events: none;
    }
    .input-wrapper input {
      width: 100%;
      padding: .7rem 2.5rem .7rem 2.4rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      font-size: .95rem;
      font-family: inherit;
      color: #0f172a;
      background: #f8fafc;
      transition: border-color .2s, box-shadow .2s;
      outline: none;
    }
    .input-wrapper input:focus {
      border-color: #1a56db;
      box-shadow: 0 0 0 3px rgba(26,86,219,.12);
      background: #fff;
    }
    .toggle-password {
      position: absolute;
      right: .75rem;
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 1rem;
      padding: 0;
      display: flex;
      align-items: center;
    }
    .toggle-password:hover { color: #1a56db; }

    /* ── Submit button ── */
    .btn-login {
      width: 100%;
      padding: .8rem;
      margin-top: .5rem;
      background: linear-gradient(135deg, #1a56db, #1e40af);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity .2s, transform .1s;
      font-family: inherit;
    }
    .btn-login:hover  { opacity: .9; transform: translateY(-1px); }
    .btn-login:active { transform: translateY(0); }

    .login-hint {
      margin-top: 1.5rem;
      font-size: .82rem;
      color: #94a3b8;
      text-align: center;
    }

    /* Spinner */
    .spin { display: inline-block; animation: rotate .7s linear infinite; }
    @keyframes rotate { to { transform: rotate(360deg); } }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .login-brand { display: none; }
      .login-form-panel { background: #fff; }
    }
  `]
})
export class LoginComponent {
  // Concept: two-way binding properties
  email: string = '';
  password: string = '';
  showError: boolean = false;
  showPassword: boolean = false;
  loading: boolean = false;

  // Hardcoded valid credential
  private readonly VALID_EMAIL = 'admin@manlog.com';
  private readonly VALID_PASSWORD = '123';

  // Concept: Router injected via constructor
  constructor(private router: Router) {}

  // Concept: event binding (ngSubmit), Router.navigate
  onLogin(): void {
    this.loading = true;
    this.showError = false;

    // Simulate a tiny async delay so the concept is visible
    setTimeout(() => {
      if (
        this.email.trim() === this.VALID_EMAIL &&
        this.password === this.VALID_PASSWORD
      ) {
        this.router.navigate(['/home']);
      } else {
        this.showError = true;
        this.loading = false;
      }
    }, 600);
  }
}
