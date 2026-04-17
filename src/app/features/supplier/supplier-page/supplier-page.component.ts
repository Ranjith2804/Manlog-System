import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-supplier-page',
  standalone: true,
  imports: [CommonModule, ShellComponent, ModalComponent],
  templateUrl: './supplier-page.component.html'
})
export class SupplierPageComponent {
  readonly menuEmitter = new EventEmitter<string>();

  activeSection: 'products' | 'orders' = 'products';
  showCategoryModal = false;
  showProductModal = false;
  showOrderModal = false;

  readonly products = [
    { name: 'Copper Wire', category: 'Electrical', subCategory: 'Cables', sku: 'SKU-101', unit: 'Meter', rate: 'Rs 120.00', leadTime: '5 Days', minQty: '100', status: 'Active' },
    { name: 'Steel Rod', category: 'Construction', subCategory: 'Raw Material', sku: 'SKU-105', unit: 'Kg', rate: 'Rs 75.00', leadTime: '7 Days', minQty: '500', status: 'Active' },
    { name: 'Ball Valve', category: 'Plumbing', subCategory: 'Valves', sku: 'SKU-108', unit: 'Piece', rate: 'Rs 220.00', leadTime: '4 Days', minQty: '80', status: 'Inactive' }
  ];

  readonly orders = [
    { id: 'PO-2026-1001', date: '24-Feb-2026', destination: 'Chennai Hub - Primary', value: 'Rs 24,000', status: 'Pending Acceptance', badgeClass: 'badge-soft-warning', actionable: true, highlight: true },
    { id: 'PO-2026-0985', date: '15-Feb-2026', destination: 'Bangalore Secondary', value: 'Rs 60,000', status: 'Shipped (In Transit)', badgeClass: 'badge-soft-info', actionable: false, highlight: false }
  ];

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Products', icon: 'fa-box-open', active: this.activeSection === 'products', actionKey: 'products' },
      { label: 'Purchase Orders', icon: 'fa-file-invoice-dollar', active: this.activeSection === 'orders', actionKey: 'orders' }
    ];
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'products' || section === 'orders') {
        this.activeSection = section;
      }
    });
  }
}
