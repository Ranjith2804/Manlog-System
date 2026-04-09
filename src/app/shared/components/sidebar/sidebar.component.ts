import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';

// MenuItem shape — each item has a label, route, and an icon class
export interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

// Concept: @Input, *ngFor, RouterLink, RouterLinkActive
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <aside class="sidebar">

      <!-- Logo -->
      <div class="sidebar-logo">
        <i class="bi bi-boxes"></i>
        <span>ManLog</span>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <p class="nav-section-label">Main Menu</p>

        <!-- Concept: *ngFor loop over @Input items -->
        <a
          *ngFor="let item of items"
          [routerLink]="item.route"
          routerLinkActive="active"
          class="nav-item"
        >
          <i [class]="'bi ' + item.icon + ' nav-icon'"></i>
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="avatar">A</div>
          <div>
            <div class="username">Admin</div>
            <div class="user-role">Team Lead</div>
          </div>
        </div>
      </div>

    </aside>
  `,
  styles: [`
    .sidebar {
      position: fixed;
      top: 0; left: 0;
      width: 250px;
      height: 100vh;
      background: #0f172a;
      display: flex;
      flex-direction: column;
      z-index: 100;
      overflow-y: auto;
    }

    /* Logo */
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding: 1.5rem 1.25rem;
      font-size: 1.3rem;
      font-weight: 700;
      color: #60a5fa;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      letter-spacing: 1px;
    }
    .sidebar-logo i { font-size: 1.6rem; }

    /* Nav */
    .sidebar-nav {
      flex: 1;
      padding: 1.25rem .75rem;
    }
    .nav-section-label {
      font-size: .7rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #475569;
      padding: 0 .5rem;
      margin-bottom: .5rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding: .65rem .85rem;
      border-radius: 8px;
      color: #94a3b8;
      font-size: .92rem;
      font-weight: 500;
      transition: background .15s, color .15s;
      margin-bottom: .2rem;
      cursor: pointer;
    }
    .nav-item:hover {
      background: rgba(255,255,255,0.06);
      color: #e2e8f0;
    }
    /* Concept: routerLinkActive adds "active" class */
    .nav-item.active {
      background: rgba(26,86,219,0.25);
      color: #60a5fa;
      font-weight: 600;
      border-left: 3px solid #1a56db;
    }
    .nav-icon { font-size: 1.05rem; width: 1.2rem; flex-shrink: 0; }

    /* Footer */
    .sidebar-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .user-info { display: flex; align-items: center; gap: .75rem; }
    .avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a56db, #3b82f6);
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .9rem;
      flex-shrink: 0;
    }
    .username { color: #e2e8f0; font-size: .88rem; font-weight: 600; }
    .user-role { color: #475569; font-size: .75rem; }
  `]
})
export class SidebarComponent {
  // Concept: @Input — receives menu items from parent component
  @Input() items: MenuItem[] = [];
}
