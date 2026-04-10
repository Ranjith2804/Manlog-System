import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-top-nav',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="top-nav shadow-sm d-flex justify-content-between align-items-center gap-3">
      <div>
        <h5 class="fw-bold mb-0">{{ title }}</h5>
        <small class="text-secondary">{{ subtitle }}</small>
      </div>
      <div class="d-flex align-items-center">
        <span class="me-4 fw-semibold">
          <i class="fas me-2 text-primary" [ngClass]="userIcon"></i>{{ userLabel }}
        </span>
        <button type="button" class="btn btn-outline-danger btn-sm fw-bold" (click)="logout.emit()">
          <i class="fas fa-sign-out-alt me-1"></i> Logout
        </button>
      </div>
    </div>
  `
})
export class TopNavComponent {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() userLabel = '';
    @Input() userIcon = 'fa-user-circle';
    @Output() logout = new EventEmitter<void>();
}