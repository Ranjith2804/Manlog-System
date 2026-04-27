import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';
import { DataService, PurchaseOrder } from '../../../core/services/data.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-supplier-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ShellComponent, ModalComponent],
  templateUrl: './supplier-page.component.html'
})
export class SupplierPageComponent {
  readonly menuEmitter = new EventEmitter<string>();
  readonly data = inject(DataService);
  readonly toast = inject(ToastService);
  readonly loading = inject(LoadingService);

  // Current supplier code (logged-in supplier)
  readonly currentSupplierCode = 'SUP-001';

  activeSection: 'products' | 'orders' = 'products';
  showCategoryModal = false;
  showProductModal = false;
  showOrderModal = false;

  productSearch = '';
  newCategoryName = '';
  newCategoryStatus = 'Active';

  selectedOrder: PurchaseOrder | null = null;

  // Product form
  newProductName = '';
  newProductCategory = 'Electrical';
  newProductSubCategory = '';
  newProductUnit = 'Piece';
  newProductRate = 0;
  newProductLeadTime = 0;
  newProductMinQty = 0;
  newProductStatus = 'Active';

  get categories() { return this.data.categories; }

  get products() {
    return this.data.getProductsBySupplier(this.currentSupplierCode);
  }

  get filteredProducts() {
    const s = this.productSearch.trim().toLowerCase();
    if (!s) return this.products;
    return this.products.filter(p =>
      [p.name, p.sku, p.category, p.subCategory].some(v => v.toLowerCase().includes(s))
    );
  }

  get orders() {
    return this.data.getOrdersForSupplier(this.currentSupplierCode);
  }

  get menuItems(): SidebarItem[] {
    return [
      { label: 'Products', icon: 'fa-box-open', active: this.activeSection === 'products', actionKey: 'products' },
      { label: 'Purchase Orders', icon: 'fa-file-invoice-dollar', active: this.activeSection === 'orders', actionKey: 'orders' }
    ];
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

  isActionable(po: PurchaseOrder): boolean {
    return po.status === 'Pending Supplier';
  }

  formatValue(v: number): string {
    return `Rs ${v.toLocaleString('en-IN')}`;
  }

  // --- Category ---
  createCategory(): void {
    const name = this.newCategoryName.trim();
    if (!name) { this.toast.warning('Category name is required'); return; }
    const result = this.data.addCategory(name);
    if (result.success) {
      this.toast.success(result.message);
      this.newCategoryName = '';
      this.showCategoryModal = false;
    } else {
      this.toast.error(result.message);
    }
  }

  // --- Product ---
  openAddProduct(): void {
    this.newProductName = '';
    this.newProductCategory = this.categories[0] ?? '';
    this.newProductSubCategory = '';
    this.newProductUnit = 'Piece';
    this.newProductRate = 0;
    this.newProductLeadTime = 0;
    this.newProductMinQty = 0;
    this.newProductStatus = 'Active';
    this.showProductModal = true;
  }

  async saveProduct(): Promise<void> {
    if (!this.newProductName.trim()) { this.toast.warning('Product name is required'); return; }
    if (this.newProductRate <= 0) { this.toast.warning('Rate must be greater than zero'); return; }
    if (this.newProductMinQty <= 0) { this.toast.warning('Minimum quantity must be greater than zero'); return; }

    this.loading.show();
    await this.loading.simulate();
    try {
      const result = this.data.addProduct({
        name: this.newProductName,
        category: this.newProductCategory,
        subCategory: this.newProductSubCategory,
        unit: this.newProductUnit,
        rate: this.newProductRate,
        leadTime: this.newProductLeadTime,
        minQty: this.newProductMinQty,
        status: this.newProductStatus,
        supplierCode: this.currentSupplierCode
      });
      if (result.success) {
        this.toast.success(result.message);
        this.showProductModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to add product: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  deleteProduct(sku: string): void {
    try {
      const result = this.data.deleteProduct(sku);
      result.success ? this.toast.success(result.message) : this.toast.error(result.message);
    } catch (e) {
      this.toast.error(`Failed to delete product: ${(e as Error).message}`);
    }
  }

  // --- Order Review ---
  reviewOrder(order: PurchaseOrder): void {
    this.selectedOrder = order;
    this.showOrderModal = true;
  }

  async acceptOrder(): Promise<void> {
    if (!this.selectedOrder) return;
    this.loading.show();
    await this.loading.simulate(500);
    try {
      const result = this.data.acceptPO(this.selectedOrder.id);
      if (result.success) {
        this.toast.success(result.message);
        this.showOrderModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to accept PO: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  async declineOrder(): Promise<void> {
    if (!this.selectedOrder) return;
    this.loading.show();
    await this.loading.simulate(300);
    try {
      const result = this.data.declinePO(this.selectedOrder.id);
      if (result.success) {
        this.toast.info(result.message);
        this.showOrderModal = false;
      } else {
        this.toast.error(result.message);
      }
    } catch (e) {
      this.toast.error(`Failed to decline PO: ${(e as Error).message}`);
    } finally {
      this.loading.hide();
    }
  }

  constructor() {
    this.menuEmitter.subscribe((section) => {
      if (section === 'products' || section === 'orders') this.activeSection = section;
    });
  }
}
