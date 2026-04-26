import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { DataService, Receipt } from '../../../core/services/data.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-dc-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, ModalComponent],
  templateUrl: './dc-dashboard-page.component.html'
})
export class DcDashboardPageComponent {
  readonly menuEmitter = new EventEmitter<string>();
  readonly data = inject(DataService);
  readonly toast = inject(ToastService);
  readonly loading = inject(LoadingService);

  activeSection: 'receipts' | 'inventory' = 'receipts';
  showVerifyModal = false;
  inventorySearch = '';
  receiverName = '';

  selectedReceipt: Receipt | null = null;

  get receipts() { return this.data.receipts; }
  get inventory() { return this.data.inventory; }

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Pending Receipts', icon: 'fa-truck-loading', active: this.activeSection === 'receipts', actionKey: 'receipts' },
      { label: 'Live Inventory', icon: 'fa-warehouse', active: this.activeSection === 'inventory', actionKey: 'inventory' }
    ];
  }

  get filteredInventory() {
    const s = this.inventorySearch.trim().toLowerCase();
    if (!s) return this.inventory;
    return this.inventory.filter(i =>
      [i.sku, i.product, i.category].some(v => v.toLowerCase().includes(s))
    );
  }

  inventoryTotal(item: { available: number; blocked: number }): number {
    return item.available + item.blocked;
  }

  openVerify(receipt: Receipt): void {
    this.selectedReceipt = receipt;
    this.receiverName = '';
    this.showVerifyModal = true;
  }

  async confirmReceipt(): Promise<void> {
    if (!this.selectedReceipt) return;
    if (!this.receiverName.trim()) { this.toast.warning('Receiver name is required as digital signature'); return; }

    this.loading.show();
    await this.loading.simulate(600);
    try {
      const result = this.data.verifyReceipt(this.selectedReceipt.id);
      if (result.success) {
        this.toast.success(result.message);
        this.showVerifyModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to verify receipt: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'receipts' || section === 'inventory') this.activeSection = section;
    });
  }
}
