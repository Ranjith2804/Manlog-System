import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, ModalComponent],
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent {
  readonly menuEmitter = new EventEmitter<string>();

  activeSection: 'suppliers' | 'dcs' = 'suppliers';
  showModal = false;
  modalTab: 'supplier' | 'dc' = 'supplier';
  searchTerm = '';
  statusFilter = '';

  readonly suppliers = [
    { code: 'SUP-001', name: 'Arun Traders', phone: '+91 9876543210', email: 'arun@traders.com', city: 'Chennai, TN', status: 'Active' },
    { code: 'SUP-002', name: 'Meena Supplies', phone: '+91 9123456780', email: 'contact@meenasupplies.com', city: 'Bangalore, KA', status: 'Inactive' }
  ];

  readonly dcs = [
    { code: 'DC-1001', name: 'Chennai Hub - Primary', email: 'chennai.hub@manlog.com', city: 'Chennai, TN', status: 'Active' },
    { code: 'DC-1002', name: 'Bangalore Secondary', email: 'blr.sec@manlog.com', city: 'Bangalore, KA', status: 'Active' }
  ];

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Suppliers', icon: 'fa-building', active: this.activeSection === 'suppliers', actionKey: 'suppliers' },
      { label: 'Distribution Centers', icon: 'fa-warehouse', active: this.activeSection === 'dcs', actionKey: 'dcs' }
    ];
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'suppliers' || section === 'dcs') {
        this.activeSection = section;
      }
    });
  }

  get filteredSuppliers() {
    return this.suppliers.filter((supplier) => this.matchesFilters(supplier.name, supplier.status, supplier.code, supplier.city));
  }

  get filteredDcs() {
    return this.dcs.filter((dc) => this.matchesFilters(dc.name, dc.status, dc.code, dc.city));
  }

  private matchesFilters(name: string, status: string, code: string, city: string): boolean {
    const search = this.searchTerm.trim().toLowerCase();
    const matchesSearch = !search || [name, status, code, city].some((value) => value.toLowerCase().includes(search));
    const matchesStatus = !this.statusFilter || this.statusFilter === status;
    return matchesSearch && matchesStatus;
  }
}
