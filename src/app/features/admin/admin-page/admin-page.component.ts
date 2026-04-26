import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { DataService, Supplier, DC } from '../../../core/services/data.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, ModalComponent],
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent {
  readonly menuEmitter = new EventEmitter<string>();
  readonly data = inject(DataService);
  readonly toast = inject(ToastService);
  readonly loading = inject(LoadingService);

  activeSection: 'suppliers' | 'dcs' = 'suppliers';
  showModal = false;
  showEditModal = false;
  modalTab: 'supplier' | 'dc' = 'supplier';
  searchTerm = '';
  statusFilter = '';

  newSupplier: Supplier = this.emptySupplier();
  newDC: DC = this.emptyDC();
  editingSupplier: Supplier | null = null;
  editingDC: DC | null = null;

  get suppliers() { return this.data.suppliers; }
  get dcs() { return this.data.dcs; }

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Suppliers', icon: 'fa-building', active: this.activeSection === 'suppliers', actionKey: 'suppliers' },
      { label: 'Distribution Centers', icon: 'fa-warehouse', active: this.activeSection === 'dcs', actionKey: 'dcs' }
    ];
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'suppliers' || section === 'dcs') this.activeSection = section;
    });
  }

  get filteredSuppliers() {
    return this.suppliers.filter((s) => this.matchesFilters(s.name, s.status, s.code, s.city, s.email));
  }

  get filteredDcs() {
    return this.dcs.filter((dc) => this.matchesFilters(dc.name, dc.status, dc.code, dc.city, dc.email));
  }

  openAddModal(): void {
    this.modalTab = this.activeSection === 'suppliers' ? 'supplier' : 'dc';
    this.newSupplier = this.emptySupplier();
    this.newDC = this.emptyDC();
    this.showModal = true;
  }

  async saveRecord(): Promise<void> {
    this.loading.show();
    await this.loading.simulate();
    try {
      if (this.modalTab === 'supplier') {
        if (!this.newSupplier.name.trim()) { this.toast.warning('Supplier name is required'); return; }
        const result = this.data.addSupplier({ name: this.newSupplier.name, phone: this.newSupplier.phone, email: this.newSupplier.email, city: this.newSupplier.city, status: this.newSupplier.status });
        if (result.success) { this.toast.success(result.message); this.showModal = false; }
        else { this.toast.error(result.message); }
      } else {
        if (!this.newDC.name.trim()) { this.toast.warning('DC name is required'); return; }
        const result = this.data.addDC({ name: this.newDC.name, email: this.newDC.email, city: this.newDC.city, status: this.newDC.status });
        if (result.success) { this.toast.success(result.message); this.showModal = false; }
        else { this.toast.error(result.message); }
      }
    } catch (e) {
      this.toast.error(`Unexpected error: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  editSupplier(supplier: Supplier): void {
    this.editingSupplier = { ...supplier };
    this.editingDC = null;
    this.showEditModal = true;
  }

  editDC(dc: DC): void {
    this.editingDC = { ...dc };
    this.editingSupplier = null;
    this.showEditModal = true;
  }

  async saveEdit(): Promise<void> {
    this.loading.show();
    await this.loading.simulate();
    try {
      if (this.editingSupplier) {
        const result = this.data.updateSupplier(this.editingSupplier.code, this.editingSupplier);
        result.success ? this.toast.success(result.message) : this.toast.error(result.message);
      } else if (this.editingDC) {
        const result = this.data.updateDC(this.editingDC.code, this.editingDC);
        result.success ? this.toast.success(result.message) : this.toast.error(result.message);
      }
      this.showEditModal = false;
    } catch (e) {
      this.toast.error(`Unexpected error: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  async deleteSupplier(supplier: Supplier): Promise<void> {
    this.loading.show();
    await this.loading.simulate(300);
    try {
      const result = this.data.deleteSupplier(supplier.code);
      result.success ? this.toast.success(result.message) : this.toast.error(result.message);
    } catch (e) {
      this.toast.error(`Failed to delete supplier: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  async deleteDC(dc: DC): Promise<void> {
    this.loading.show();
    await this.loading.simulate(300);
    try {
      const result = this.data.deleteDC(dc.code);
      result.success ? this.toast.success(result.message) : this.toast.error(result.message);
    } catch (e) {
      this.toast.error(`Failed to delete DC: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  private matchesFilters(...fields: string[]): boolean {
    const search = this.searchTerm.trim().toLowerCase();
    const status = fields[1];
    const matchesSearch = !search || fields.some((v) => v.toLowerCase().includes(search));
    const matchesStatus = !this.statusFilter || this.statusFilter === status;
    return matchesSearch && matchesStatus;
  }

  private emptySupplier(): Supplier {
    return { code: '', name: '', phone: '', email: '', city: '', status: 'Active' };
  }

  private emptyDC(): DC {
    return { code: '', name: '', email: '', city: '', status: 'Active' };
  }
}
