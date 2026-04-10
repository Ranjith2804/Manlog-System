import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { TopNavComponent } from '../../../shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavComponent],
  template: `
    <div class="app-page-shell">
      <app-sidebar
        [userName]="sidebarUserName"
        [subtitle]="sidebarSubtitle"
        [items]="menuItems"
        (itemSelected)="menuAction.emit($event)"
      />

      <main class="main-content">
        <app-top-nav
          [title]="title"
          [subtitle]="subtitle"
          [userLabel]="userLabel"
          [userIcon]="userIcon"
          (logout)="onLogout()"
        />
        <ng-content></ng-content>
      </main>
    </div>
  `,
  styles: [`
    .main-content {
      margin-left: 250px;
      padding: 25px;
    }

    @media (max-width: 991.98px) {
      .main-content {
        margin-left: 0;
        padding: 16px;
      }
    }
  `]
})
export class ShellComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() userLabel = '';
  @Input() userIcon = 'fa-user-circle';
  @Input() sidebarUserName = '';
  @Input() sidebarSubtitle = '';
  @Input() menuItems: SidebarItem[] = [];
  @Input() menuAction: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly router: Router) {}

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}