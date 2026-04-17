import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() borderClass = 'border-primary-subtle';
}
