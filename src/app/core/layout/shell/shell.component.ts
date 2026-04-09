import { Component, Input } from '@angular/core';
import { SidebarComponent, MenuItem } from '../../../shared/components/sidebar/sidebar.component';

// Concept: @Input, ng-content (content projection), component composition
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <!-- Sidebar: pass hardcoded menu items via [items] @Input -->
    <app-sidebar [items]="menuItems" />

    <!-- Main area -->
    <div class="shell-main">

      <!-- Top bar -->
      <header class="topbar">
        <div class="topbar-left">
          <!-- Concept: @Input title passed from parent page -->
          <h1 class="page-title">{{ title }}</h1>
          <nav class="breadcrumb-trail" aria-label="breadcrumb">
            <span>ManLog</span>
            <i class="bi bi-chevron-right"></i>
            <span class="active">{{ title }}</span>
          </nav>
        </div>
        <div class="topbar-right">
          <button class="icon-btn" title="Notifications">
            <i class="bi bi-bell"></i>
            <span class="badge">3</span>
          </button>
          <button class="icon-btn" title="Settings">
            <i class="bi bi-gear"></i>
          </button>
          <div class="topbar-avatar">A</div>
        </div>
      </header>

      <!-- Page body — Concept: ng-content content projection -->
      <main class="shell-content">
        <ng-content />
      </main>

    </div>
  `,
  styles: [`
    /* ── Sidebar is 250px fixed; push main content right ── */
    .shell-main {
      margin-left: 250px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f4f6f9;
    }

    /* ── Top bar ── */
    .topbar {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: #fff;
      border-bottom: 1px solid #e8ecf0;
      z-index: 50;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .topbar-left { display: flex; flex-direction: column; gap: .15rem; }
    .page-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .breadcrumb-trail {
      font-size: .78rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      gap: .3rem;
    }
    .breadcrumb-trail .active { color: #1a56db; font-weight: 500; }
    .breadcrumb-trail i { font-size: .65rem; }

    .topbar-right { display: flex; align-items: center; gap: .75rem; }
    .icon-btn {
      position: relative;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #475569;
      font-size: 1rem;
      transition: background .15s;
    }
    .icon-btn:hover { background: #e2e8f0; }
    .badge {
      position: absolute;
      top: -4px; right: -4px;
      background: #ef4444;
      color: #fff;
      border-radius: 50%;
      width: 16px; height: 16px;
      font-size: .65rem;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700;
    }
    .topbar-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a56db, #3b82f6);
      color: #fff;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .9rem;
      cursor: pointer;
    }

    /* ── Page body ── */
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
  // Concept: @Input — page title passed from each feature page
  @Input() title: string = 'Dashboard';

  // Hardcoded menu items — passed down to sidebar via [items]
  menuItems: MenuItem[] = [
    { label: 'Home',         route: '/home',         icon: 'bi-house-door' },
    { label: 'Procurement',  route: '/procurement',  icon: 'bi-cart-check' },
    { label: 'Supplier',     route: '/supplier',     icon: 'bi-people' },
    { label: 'Distribution', route: '/distribution', icon: 'bi-truck' },
  ];
}
