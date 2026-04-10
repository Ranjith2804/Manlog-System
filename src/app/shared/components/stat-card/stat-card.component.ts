import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-custom p-3 shadow-sm border-start border-4" [ngClass]="borderClass">
      <p class="text-muted small fw-bold mb-1">{{ label }}</p>
      <h4 class="fw-bold mb-0">{{ value }}</h4>
    </div>
  `
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() borderClass = 'border-primary-subtle';
}
