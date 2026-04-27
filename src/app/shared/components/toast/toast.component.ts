import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toastService.toasts; trackBy: trackById"
           class="toast-item"
           [class.toast-success]="toast.type === 'success'"
           [class.toast-error]="toast.type === 'error'"
           [class.toast-warning]="toast.type === 'warning'"
           [class.toast-info]="toast.type === 'info'"
           [class.toast-removing]="toast.removing"
           (click)="toastService.dismiss(toast.id)">
        <i class="fas {{ toast.icon }} toast-icon"></i>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" (click)="toastService.dismiss(toast.id)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast-item {
      pointer-events: all;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: 10px;
      min-width: 320px;
      max-width: 480px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      animation: slideIn 0.3s ease-out;
      backdrop-filter: blur(8px);
      font-weight: 500;
      font-size: 14px;
    }
    .toast-removing {
      animation: slideOut 0.3s ease-in forwards;
    }
    .toast-success {
      background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
      border-left: 4px solid #28a745;
      color: #155724;
    }
    .toast-error {
      background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
      border-left: 4px solid #dc3545;
      color: #721c24;
    }
    .toast-warning {
      background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
      border-left: 4px solid #ffc107;
      color: #856404;
    }
    .toast-info {
      background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%);
      border-left: 4px solid #17a2b8;
      color: #0c5460;
    }
    .toast-icon { font-size: 18px; flex-shrink: 0; }
    .toast-message { flex: 1; line-height: 1.4; }
    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.6;
      font-size: 14px;
      padding: 0;
      color: inherit;
      flex-shrink: 0;
    }
    .toast-close:hover { opacity: 1; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `]
})
export class ToastComponent {
  readonly toastService = inject(ToastService);

  trackById(_: number, toast: { id: number }): number {
    return toast.id;
  }
}
