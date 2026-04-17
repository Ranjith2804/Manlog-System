import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-procurement-page',
  standalone: true,
  imports: [CommonModule, ShellComponent, ModalComponent, StatCardComponent],
  templateUrl: './procurement-page.component.html'
})
export class ProcurementPageComponent {
  readonly menuEmitter = new EventEmitter<string>();

  activeSection: 'pos' | 'catalogs' = 'pos';
  showModal = false;

  readonly purchaseOrders = [
    { id: 'PO-2026-1001', date: '24-Feb-2026', supplier: 'Arun Traders', destination: 'Chennai Hub - Primary', value: 'Rs 24,000', status: 'Pending Supplier', badgeClass: 'badge-soft-warning', highlight: true },
    { id: 'PO-2026-0985', date: '15-Feb-2026', supplier: 'Arun Traders', destination: 'Bangalore Secondary', value: 'Rs 60,000', status: 'Shipped (In Transit)', badgeClass: 'badge-soft-info', highlight: false },
    { id: 'PO-2026-0902', date: '01-Feb-2026', supplier: 'Meena Supplies', destination: 'Chennai Hub - Primary', value: 'Rs 1,15,000', status: 'Received at DC', badgeClass: 'badge-soft-success', highlight: false }
  ];

  readonly catalogsData = [
    { sku: 'SKU-101', product: 'Copper Wire (1.5mm)', supplier: 'Arun Traders', rate: 'Rs 120.00', leadTime: '5 Days', minQty: '100' },
    { sku: 'SKU-105', product: 'Steel Rod (Grade A)', supplier: 'Arun Traders', rate: 'Rs 75.00', leadTime: '7 Days', minQty: '500' },
    { sku: 'SKU-105', product: 'Steel Rod (Grade A)', supplier: 'Meena Supplies', rate: 'Rs 78.00', leadTime: '4 Days', minQty: '200' }
  ];

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Purchase Orders', icon: 'fa-file-invoice-dollar', active: this.activeSection === 'pos', actionKey: 'pos' },
      { label: 'Supplier Catalogs', icon: 'fa-book-open', active: this.activeSection === 'catalogs', actionKey: 'catalogs' }
    ];
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'pos' || section === 'catalogs') {
        this.activeSection = section;
      }
    });
  }
}
