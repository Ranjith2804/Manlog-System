import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-supplier-page',
  standalone: true,
  imports: [CommonModule, ShellComponent, ModalComponent],
  template: `
    <app-shell
      title="Supplier Portal"
      subtitle="Manage your catalog, categories, and fulfill orders"
      userLabel="Arun Kumar"
      userIcon="fa-user-circle"
      sidebarSubtitle="Arun Traders (Supplier)"
      [menuItems]="menuItems"
      [menuAction]="menuEmitter"
    >
      <div *ngIf="activeSection === 'products'; else orderSection">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Product Management</h5>
          <div>
            <button class="btn btn-outline-secondary me-2 fw-semibold" type="button" (click)="showCategoryModal = true"><i class="fas fa-folder-plus me-1"></i> Create Category</button>
            <button class="btn btn-primary fw-semibold" type="button" (click)="showProductModal = true"><i class="fas fa-plus-circle me-1"></i> Add New Product</button>
          </div>
        </div>

        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th>Product Name</th><th>Category</th><th>Sub Category</th><th>SKU Code</th><th>Unit</th><th>Supplier Rate</th><th>Lead Time</th><th>Min Qty</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let product of products">
                  <td class="fw-bold">{{ product.name }}</td>
                  <td>{{ product.category }}</td>
                  <td>{{ product.subCategory }}</td>
                  <td><span class="badge badge-code rounded-1">{{ product.sku }}</span></td>
                  <td>{{ product.unit }}</td>
                  <td>{{ product.rate }}</td>
                  <td>{{ product.leadTime }}</td>
                  <td>{{ product.minQty }}</td>
                  <td><span class="badge rounded-pill" [ngClass]="product.status === 'Active' ? 'badge-soft-success' : 'badge-soft-danger'">{{ product.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ng-template #orderSection>
        <div class="d-flex justify-content-between align-items-center mb-3"><h5 class="fw-bold mb-0">Incoming Purchase Orders</h5></div>
        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th class="ps-4">PO Number</th><th>Order Date</th><th>Delivery DC</th><th>Total Value</th><th>Status</th><th class="text-center">Action</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of orders">
                  <td class="ps-4"><span class="badge badge-code rounded-1" [class.text-primary]="order.highlight">{{ order.id }}</span></td>
                  <td>{{ order.date }}</td>
                  <td class="fw-bold">{{ order.destination }}</td>
                  <td>{{ order.value }}</td>
                  <td><span class="badge rounded-pill" [ngClass]="order.badgeClass">{{ order.status }}</span></td>
                  <td class="text-center">
                    <button *ngIf="order.actionable; else locked" class="btn btn-sm btn-primary fw-bold" type="button" (click)="showOrderModal = true">Review & Act</button>
                    <ng-template #locked><button class="btn btn-sm btn-outline-secondary" disabled>Locked</button></ng-template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ng-template>

      <app-modal [open]="showCategoryModal" (closed)="showCategoryModal = false">
        <span modal-title><i class="fas fa-folder-plus text-primary me-2"></i>Create Category</span>
        <form>
          <div class="mb-3"><label class="form-label text-muted small fw-bold">Category Name</label><input type="text" class="form-control" placeholder="e.g. Electrical"></div>
          <div class="mb-3"><label class="form-label text-muted small fw-bold">Status</label><select class="form-select"><option>Active</option><option>Inactive</option></select></div>
        </form>
        <div class="text-end mt-4 pt-3 border-top">
          <button type="button" class="btn btn-light border me-2" (click)="showCategoryModal = false">Cancel</button>
          <button type="button" class="btn btn-secondary px-4" (click)="showCategoryModal = false">Create Category</button>
        </div>
      </app-modal>

      <app-modal [open]="showProductModal" (closed)="showProductModal = false">
        <span modal-title><i class="fas fa-box-open text-primary me-2"></i>Add New Product</span>
        <form class="row g-3">
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">Product Name</label><input type="text" class="form-control" placeholder="e.g. Copper Wire"></div>
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">Category</label><select class="form-select"><option>Electrical</option><option>Construction</option><option>Plumbing</option></select></div>
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">Sub Category</label><input type="text" class="form-control" placeholder="e.g. Cables"></div>
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">SKU Code</label><input type="text" class="form-control" placeholder="e.g. SKU-101"></div>
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">Unit</label><select class="form-select"><option>Piece</option><option>Kg</option><option>Meter</option><option>Bag</option></select></div>
          <div class="col-md-6"><label class="form-label text-muted small fw-bold">Specification</label><input type="text" class="form-control" placeholder="e.g. 1.5mm FR Grade"></div>
          <div class="col-md-4"><label class="form-label text-muted small fw-bold">Supplier Rate (Rs)</label><input type="number" class="form-control" placeholder="120"></div>
          <div class="col-md-4"><label class="form-label text-muted small fw-bold">Lead Time (Days)</label><input type="number" class="form-control" placeholder="5"></div>
          <div class="col-md-4"><label class="form-label text-muted small fw-bold">Min Order Qty</label><input type="number" class="form-control" placeholder="100"></div>
          <div class="col-md-12"><label class="form-label text-muted small fw-bold">Status</label><select class="form-select"><option>Active</option><option>Inactive</option></select></div>
        </form>
        <div class="text-end mt-4 pt-3 border-top">
          <button type="button" class="btn btn-light border me-2" (click)="showProductModal = false">Cancel</button>
          <button type="button" class="btn btn-primary px-4" (click)="showProductModal = false">Save Product</button>
        </div>
      </app-modal>

      <app-modal [open]="showOrderModal" (closed)="showOrderModal = false" headerClass="bg-primary text-white" titleClass="text-white" closeButtonClass="btn-close-white">
        <span modal-title>Review Purchase Order: PO-2026-1001</span>
        <div class="row mb-3">
          <div class="col-md-6"><p class="mb-1 text-muted small">Deliver To:</p><h6 class="fw-bold">Chennai Hub - Primary</h6><small>123 Logistics Park, Chennai, TN</small></div>
          <div class="col-md-6 text-end"><p class="mb-1 text-muted small">Requested Delivery Date:</p><h6 class="fw-bold text-danger">01-Mar-2026</h6></div>
        </div>
        <table class="table table-bordered mb-4">
          <thead class="table-light"><tr><th>SKU Code</th><th>Product Name</th><th>Qty Requested</th><th>Unit Price</th><th>Total Price</th></tr></thead>
          <tbody><tr><td>SKU-101</td><td>Copper Wire (1.5mm)</td><td>200 Meters</td><td>Rs 120</td><td class="fw-bold">Rs 24,000</td></tr></tbody>
        </table>
        <div class="alert alert-info border-0 text-center"><i class="fas fa-info-circle me-2"></i> Accepting this PO will automatically generate an <strong>Inbound Shipment</strong> record.</div>
        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-outline-danger px-4" (click)="showOrderModal = false"><i class="fas fa-times me-1"></i> Decline PO</button>
          <button type="button" class="btn btn-success px-4" (click)="showOrderModal = false"><i class="fas fa-check-circle me-1"></i> Accept & Generate Shipment</button>
        </div>
      </app-modal>
    </app-shell>
  `
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
