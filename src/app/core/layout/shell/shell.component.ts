import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarComponent, SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { TopNavComponent } from '../../../shared/components/top-nav/top-nav.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopNavComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
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

  constructor(private readonly router: Router) { }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}