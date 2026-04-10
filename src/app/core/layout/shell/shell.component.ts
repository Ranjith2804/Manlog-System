import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { TopNavComponent } from '../../../shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent, TopNavComponent],
  template: `
    <app-sidebar
      [items]="items"
      (itemSelected)="itemSelected.emit($event)"
    />

    <div class="shell-main">
      <app-top-nav
        [title]="title"
        [subtitle]="subtitle"
        [userLabel]="userLabel"
        [userIcon]="userIcon"
        (logout)="onLogout()"
      />
      <main class="shell-content">
        <ng-content />
      </main>
    </div>
  `,
  styles: [`
    .shell-main {
      margin-left: 250px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f4f6f9;
    }
    .shell-content {
      padding: 2rem;
      flex: 1;
    }
    @media (max-width: 768px) {
      .shell-main { margin-left: 0; }
    }
  `]
})
export class ShellComponent {
  @Input() title = 'Dashboard';
  @Input() subtitle = '';
  @Input() userLabel = '';
  @Input() userIcon = 'fa-user-circle';
  @Input() items: SidebarItem[] = [];
  @Output() itemSelected = new EventEmitter<string>();

  constructor(private router: Router) { }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}