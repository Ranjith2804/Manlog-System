import { Component } from '@angular/core';
import { ShellComponent } from '../../../core/layout/shell/shell.component';

@Component({
  selector: 'app-procurement-page',
  standalone: true,
  imports: [ShellComponent],
  template: `
    <app-shell title="Procurement">
      <div class="placeholder-page">
        <div class="placeholder-icon"><i class="bi bi-cart-check"></i></div>
        <h2>Procurement Module</h2>
        <p class="coming-soon">Coming Soon</p>
        <p class="placeholder-note">
          This module is reserved for the <strong>Procurement team branch</strong>.<br />
          Create your feature branch and start building here.
        </p>
        <code class="branch-hint">git checkout -b feature/procurement-module</code>
      </div>
    </app-shell>
  `,
  styles: [`
    .placeholder-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      gap: .75rem;
    }
    .placeholder-icon {
      font-size: 3.5rem;
      color: #1a56db;
      background: #eff6ff;
      width: 90px; height: 90px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: .5rem;
    }
    h2 { font-size: 1.6rem; font-weight: 700; color: #0f172a; margin: 0; }
    .coming-soon {
      font-size: 1rem;
      font-weight: 600;
      color: #1a56db;
      background: #eff6ff;
      padding: .25rem .9rem;
      border-radius: 20px;
    }
    .placeholder-note { color: #64748b; font-size: .92rem; line-height: 1.7; margin: 0; }
    .branch-hint {
      display: inline-block;
      margin-top: .5rem;
      background: #0f172a;
      color: #60a5fa;
      padding: .5rem 1.25rem;
      border-radius: 8px;
      font-size: .85rem;
      letter-spacing: .5px;
    }
  `]
})
export class ProcurementPageComponent {}
