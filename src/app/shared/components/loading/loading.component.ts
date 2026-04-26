import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" *ngIf="loading.isLoading">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">Processing...</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 99998;
      background: rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(2px);
      animation: fadeIn 0.15s ease-out;
    }
    .loading-spinner {
      background: #fff;
      border-radius: 16px;
      padding: 32px 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }
    .spinner {
      width: 44px;
      height: 44px;
      border: 4px solid #e9ecef;
      border-top: 4px solid #0d6efd;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .loading-text {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #495057;
      letter-spacing: 0.5px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class LoadingComponent {
  readonly loading = inject(LoadingService);
}
