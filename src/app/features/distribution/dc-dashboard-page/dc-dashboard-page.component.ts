import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dc-dashboard-page',
  standalone: true,
  imports: [CommonModule, ShellComponent, ModalComponent],
  templateUrl: './dc-dashboard-page.component.html'
})
export class DcDashboardPageComponent {
  readonly menuEmitter = new EventEmitter<string>();

  activeSection: 'receipts' | 'inventory' = 'receipts';
  showVerifyModal = false;

  readonly receipts = [
    { id: 'RCPT-1001', shipment: 'SHP-5022', vehicle: 'TN-01-AB-1234', date: '24-Feb-2026', status: 'Pending Verification' },
    { id: 'RCPT-1002', shipment: 'SHP-5025', vehicle: 'MH-12-XY-9876', date: '24-Feb-2026', status: 'Pending Verification' }
  ];

  readonly inventory = [
    { sku: 'SKU-101', product: 'Copper Wire (1.5mm)', category: 'Electrical', available: '1,250', blocked: '50', total: '1,300' },
    { sku: 'SKU-105', product: 'Steel Rod (Grade A)', category: 'Construction', available: '4,500', blocked: '0', total: '4,500' },
    { sku: 'SKU-108', product: 'Ball Valve', category: 'Plumbing', available: '15', blocked: '5', total: '20' }
  ];

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Pending Receipts', icon: 'fa-truck-loading', active: this.activeSection === 'receipts', actionKey: 'receipts' },
      { label: 'Live Inventory', icon: 'fa-warehouse', active: this.activeSection === 'inventory', actionKey: 'inventory' }
    ];
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'receipts' || section === 'inventory') {
        this.activeSection = section;
      }
    });
  }
}
