import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  active?: boolean;
  actionKey?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar p-3 shadow">
      <h4 class="text-center mb-4 mt-2 fw-bold">
        <i class="fas fa-boxes text-primary"></i> ManLog
      </h4>
      <p class="text-white small text-center mb-1" *ngIf="userName">{{ userName }}</p>
      <p class="text-white small text-center mb-4">{{ subtitle }}</p>

      <div class="nav flex-column nav-pills">
        <ng-container *ngFor="let item of items">
          <a
            *ngIf="item.route; else actionLink"
            class="nav-link"
            [routerLink]="item.route"
            routerLinkActive="active"
          >
            <i class="fas me-2" [ngClass]="item.icon"></i>{{ item.label }}
          </a>
          <ng-template #actionLink>
            <button
              type="button"
              class="nav-link nav-button text-start border-0"
              [class.active]="item.active"
              (click)="item.actionKey && itemSelected.emit(item.actionKey)"
            >
              <i class="fas me-2" [ngClass]="item.icon"></i>{{ item.label }}
            </button>
          </ng-template>
        </ng-container>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      min-height: 100vh;
      background-color: #343a40;
      color: #fff;
      position: fixed;
      width: 250px;
      z-index: 1000;
    }

    .sidebar a,
    .nav-button {
      color: #adb5bd;
      text-decoration: none;
      padding: 12px 15px;
      display: block;
      border-radius: 6px;
      margin-bottom: 8px;
      transition: all 0.2s ease;
      cursor: pointer;
      background: transparent;
      width: 100%;
    }

    .sidebar a:hover,
    .sidebar a.active,
    .nav-button:hover,
    .nav-button.active {
      background-color: #0d6efd;
      color: #fff;
    }

    @media (max-width: 991.98px) {
      .sidebar {
        position: static;
        width: 100%;
        min-height: auto;
        border-radius: 0 0 12px 12px;
      }
    }
  `]
})
export class SidebarComponent {
  @Input() userName = '';
  @Input() subtitle = '';
  @Input() items: SidebarItem[] = [];
  @Output() itemSelected = new EventEmitter<string>();
}
