import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ShellComponent } from '../../core/layout/shell/shell.component';

// Shape of each dashboard card
interface DashboardCard {
  label: string;
  description: string;
  route: string;
  icon: string;
  color: string;
  stats: string;
}

// Concept: *ngFor on cards, @Input passing to shell, routerLink on cards
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShellComponent, RouterLink, NgFor],
  template: `
    <!-- Concept: @Input title passed to shell -->
    <app-shell title="Home">

      <!-- Welcome banner -->
      <div class="welcome-banner">
        <div class="welcome-text">
          <h2>Good morning, Admin 👋</h2>
          <p>Here's a quick overview of your ManLog modules.</p>
        </div>
        <div class="welcome-date">
          <i class="bi bi-calendar3"></i>
          {{ today }}
        </div>
      </div>

      <!-- Concept: *ngFor loop over cards array -->
      <div class="cards-grid">
        <a
          *ngFor="let card of cards"
          [routerLink]="card.route"
          class="dash-card"
          [style.--accent]="card.color"
        >
          <div class="card-icon-wrap">
            <i [class]="'bi ' + card.icon"></i>
          </div>
          <div class="card-body">
            <h3 class="card-label">{{ card.label }}</h3>
            <p class="card-desc">{{ card.description }}</p>
          </div>
          <div class="card-footer">
            <span class="card-stat">{{ card.stats }}</span>
            <span class="card-arrow"><i class="bi bi-arrow-right"></i></span>
          </div>
        </a>
      </div>

      <!-- Quick summary row -->
      <div class="summary-row">
        <div class="summary-box">
          <i class="bi bi-activity"></i>
          <div>
            <h4>System Status</h4>
            <p>All modules operational</p>
          </div>
          <span class="status-dot"></span>
        </div>
        <div class="summary-box">
          <i class="bi bi-people"></i>
          <div>
            <h4>Active Users</h4>
            <p>4 team members online</p>
          </div>
        </div>
        <div class="summary-box">
          <i class="bi bi-clock-history"></i>
          <div>
            <h4>Last Synced</h4>
            <p>Just now</p>
          </div>
        </div>
      </div>

    </app-shell>
  `,
  styles: [`
    /* ── Welcome banner ── */
    .welcome-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #0f172a, #1e3a5f);
      border-radius: 14px;
      padding: 1.75rem 2rem;
      color: #fff;
      margin-bottom: 2rem;
    }
    .welcome-text h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: .25rem;
    }
    .welcome-text p { color: #94a3b8; font-size: .95rem; margin: 0; }
    .welcome-date {
      background: rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: .5rem 1rem;
      font-size: .9rem;
      display: flex;
      gap: .5rem;
      align-items: center;
      color: #cbd5e1;
    }

    /* ── Cards grid ── */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }
    .dash-card {
      background: #fff;
      border-radius: 14px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: .85rem;
      border: 1px solid #e8ecf0;
      cursor: pointer;
      transition: transform .2s, box-shadow .2s;
      border-top: 4px solid var(--accent, #1a56db);
      text-decoration: none;
      color: inherit;
    }
    .dash-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.1);
    }
    .card-icon-wrap {
      width: 48px; height: 48px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--accent, #1a56db) 12%, transparent);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
      color: var(--accent, #1a56db);
    }
    .card-label {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
    }
    .card-desc {
      font-size: .85rem;
      color: #64748b;
      margin: 0;
      flex: 1;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: .75rem;
      border-top: 1px solid #f1f5f9;
    }
    .card-stat {
      font-size: .8rem;
      font-weight: 600;
      color: var(--accent, #1a56db);
    }
    .card-arrow {
      width: 28px; height: 28px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--accent, #1a56db) 10%, transparent);
      display: flex; align-items: center; justify-content: center;
      color: var(--accent, #1a56db);
      font-size: .85rem;
      transition: background .15s;
    }
    .dash-card:hover .card-arrow {
      background: var(--accent, #1a56db);
      color: #fff;
    }

    /* ── Summary row ── */
    .summary-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .summary-box {
      background: #fff;
      border-radius: 12px;
      padding: 1.1rem 1.25rem;
      border: 1px solid #e8ecf0;
      display: flex;
      align-items: center;
      gap: .9rem;
      font-size: 1.3rem;
      color: #1a56db;
    }
    .summary-box h4 {
      font-size: .88rem;
      font-weight: 600;
      color: #0f172a;
      margin: 0;
    }
    .summary-box p {
      font-size: .78rem;
      color: #94a3b8;
      margin: 0;
    }
    .status-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #22c55e;
      margin-left: auto;
      box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
    }
  `]
})
export class HomeComponent {
  today: string = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Concept: *ngFor data array
  cards: DashboardCard[] = [
    {
      label: 'Admin',
      description: 'Manage users, roles, and system-wide settings.',
      route: '/home',
      icon: 'bi-shield-check',
      color: '#7c3aed',
      stats: 'System config'
    },
    {
      label: 'Procurement',
      description: 'Purchase orders, vendor management, and approvals.',
      route: '/procurement',
      icon: 'bi-cart-check',
      color: '#1a56db',
      stats: '12 pending POs'
    },
    {
      label: 'Supplier',
      description: 'Supplier profiles, contracts, and performance tracking.',
      route: '/supplier',
      icon: 'bi-people',
      color: '#0891b2',
      stats: '8 active suppliers'
    },
    {
      label: 'Distribution',
      description: 'DC operations, shipment tracking, and delivery status.',
      route: '/distribution',
      icon: 'bi-truck',
      color: '#059669',
      stats: '5 shipments today'
    },
  ];
}
