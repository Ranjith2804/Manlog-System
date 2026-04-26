import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { DataService, PurchaseOrder } from '../../../core/services/data.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

interface LineItem {
  skuKey: string;
  unitPrice: number;
  quantity: number | null;
  total: number;
}

@Component({
  selector: 'app-procurement-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, ModalComponent, StatCardComponent],
  templateUrl: './procurement-page.component.html'
})
export class ProcurementPageComponent {
  readonly menuEmitter = new EventEmitter<string>();
  readonly data = inject(DataService);
  readonly toast = inject(ToastService);
  readonly loading = inject(LoadingService);

  activeSection: 'pos' | 'catalogs' = 'pos';
  showModal = false;
  showDetailModal = false;
  selectedPO: PurchaseOrder | null = null;
  catalogSearch = '';

  // Form fields
  selectedSupplierCode = 'SUP-001';
  selectedDCCode = 'DC-1001';
  requiredDate = '';

  lineItems: LineItem[] = [this.createLineItem()];

  get purchaseOrders() { return this.data.purchaseOrders; }

  get suppliers() {
    return this.data.suppliers.map(s => ({ code: s.code, label: `${s.code} | ${s.name}` }));
  }

  get destinations() {
    return this.data.dcs.map(d => ({ code: d.code, label: `${d.code} | ${d.name}` }));
  }

  get skuOptions() {
    return this.data.products.map(p => ({ key: p.sku, label: `${p.sku} | ${p.name}`, product: p.name, price: p.rate }));
  }

  get catalogsData() {
    return this.data.products.map(p => {
      const sup = this.data.suppliers.find(s => s.code === p.supplierCode);
      return {
        sku: p.sku, product: p.name, supplier: sup?.name ?? 'Unknown',
        rate: `Rs ${p.rate.toFixed(2)}`, leadTime: `${p.leadTime} Days`, minQty: String(p.minQty)
      };
    });
  }

  get filteredCatalogs() {
    const s = this.catalogSearch.trim().toLowerCase();
    if (!s) return this.catalogsData;
    return this.catalogsData.filter(c =>
      [c.sku, c.product, c.supplier].some(v => v.toLowerCase().includes(s))
    );
  }

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Purchase Orders', icon: 'fa-file-invoice-dollar', active: this.activeSection === 'pos', actionKey: 'pos' },
      { label: 'Supplier Catalogs', icon: 'fa-book-open', active: this.activeSection === 'catalogs', actionKey: 'catalogs' }
    ];
  }

  get activePOValue(): string {
    const total = this.purchaseOrders
      .filter(p => p.status !== 'Received at DC')
      .reduce((s, p) => s + p.value, 0);
    return `Rs ${total.toLocaleString('en-IN')}`;
  }

  get pendingCount(): string {
    return `${this.purchaseOrders.filter(p => p.status === 'Pending Supplier').length} Orders`;
  }

  get receivedCount(): string {
    return `${this.purchaseOrders.filter(p => p.status === 'Received at DC').length} Received`;
  }

  get estimatedTotal(): number {
    return this.lineItems.reduce((sum, item) => sum + item.total, 0);
  }

  badgeClass(status: string): string {
    switch (status) {
      case 'Pending Supplier': return 'badge-soft-warning';
      case 'Shipped (In Transit)': return 'badge-soft-info';
      case 'Received at DC': return 'badge-soft-success';
      case 'Accepted': return 'badge-soft-primary';
      case 'Declined': return 'badge-soft-danger';
      default: return 'badge-soft-secondary';
    }
  }

  formatValue(v: number): string {
    return `Rs ${v.toLocaleString('en-IN')}`;
  }

  openCreatePO(): void {
    this.lineItems = [this.createLineItem()];
    this.selectedSupplierCode = this.data.suppliers[0]?.code ?? '';
    this.selectedDCCode = this.data.dcs[0]?.code ?? '';
    this.requiredDate = '';
    this.showModal = true;
  }

  viewPO(po: PurchaseOrder): void {
    this.selectedPO = po;
    this.showDetailModal = true;
  }

  deletePO(po: PurchaseOrder): void {
    this.loading.show();
    try {
      const result = this.data.deletePO(po.id);
      if (result.success) {
        this.toast.success(result.message);
        this.showDetailModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to delete PO: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  async issuePO(): Promise<void> {
    const validItems = this.lineItems.filter(i => (i.quantity ?? 0) > 0);
    if (validItems.length === 0) { this.toast.warning('Add at least one line item with quantity'); return; }
    if (!this.requiredDate) { this.toast.warning('Required delivery date is mandatory'); return; }

    this.loading.show();
    await this.loading.simulate(500);
    try {
      const items = validItems.map(i => {
        const sku = this.skuOptions.find(s => s.key === i.skuKey);
        return {
          sku: i.skuKey,
          product: sku?.product ?? i.skuKey,
          unitPrice: i.unitPrice,
          quantity: i.quantity ?? 0,
          total: i.total
        };
      });

      const result = this.data.createPO(this.selectedSupplierCode, this.selectedDCCode, this.requiredDate, items);
      if (result.success) {
        this.toast.success(result.message);
        this.showModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to issue PO: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  addLineItem(): void {
    this.lineItems.push(this.createLineItem());
  }

  removeLineItem(index: number): void {
    this.lineItems.splice(index, 1);
    if (this.lineItems.length === 0) this.lineItems.push(this.createLineItem());
  }

  onSkuChange(item: LineItem): void {
    const sku = this.skuOptions.find(s => s.key === item.skuKey);
    item.unitPrice = sku ? sku.price : 0;
    this.recalcItem(item);
  }

  onQtyChange(item: LineItem): void {
    this.recalcItem(item);
  }

  private createLineItem(): LineItem {
    const first = this.skuOptions[0];
    return { skuKey: first?.key ?? '', unitPrice: first?.price ?? 0, quantity: null, total: 0 };
  }

  private recalcItem(item: LineItem): void {
    item.total = item.unitPrice * (item.quantity ?? 0);
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'pos' || section === 'catalogs') this.activeSection = section;
    });
  }
}
