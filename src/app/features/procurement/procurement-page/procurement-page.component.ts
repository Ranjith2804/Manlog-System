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
  template: `
    <app-shell
      title="Global Procurement Hub"
      subtitle="Manage purchase orders and vendor relations"
      userLabel="Procurement Desk"
      userIcon="fa-user-shield"
      sidebarUserName="Nowshaath"
      sidebarSubtitle="Procurement-Head"
      [menuItems]="menuItems"
      [menuAction]="menuEmitter"
    >
      <div class="row mb-4">
        <div class="col-md-4"><app-stat-card label="Active POs (Value)" value="Rs 8,45,000" borderClass="border-primary-subtle" /></div>
        <div class="col-md-4"><app-stat-card label="Pending Supplier Acceptance" value="12 Orders" borderClass="border-warning-subtle" /></div>
        <div class="col-md-4"><app-stat-card label="Received This Week" value="45 Shipments" borderClass="border-success-subtle" /></div>
      </div>

      <div *ngIf="activeSection === 'pos'; else catalogs">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Purchase Order History</h5>
          <button class="btn btn-primary fw-semibold shadow-sm" type="button" (click)="showModal = true">
            <i class="fas fa-plus-circle me-1"></i> Create New PO
          </button>
        </div>

        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th class="ps-4">PO Number</th><th>Date Issued</th><th>Supplier</th><th>Delivery Destination</th><th>Total Value</th><th>Status</th><th class="text-center">Action</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let po of purchaseOrders">
                  <td class="ps-4"><span class="badge badge-code rounded-1" [class.text-primary]="po.highlight">{{ po.id }}</span></td>
                  <td>{{ po.date }}</td>
                  <td class="fw-bold">{{ po.supplier }}</td>
                  <td>{{ po.destination }}</td>
                  <td>{{ po.value }}</td>
                  <td><span class="badge rounded-pill" [ngClass]="po.badgeClass">{{ po.status }}</span></td>
                  <td class="text-center"><button class="btn btn-sm btn-outline-secondary"><i class="fas fa-eye"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ng-template #catalogs>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Approved Vendor Catalogs</h5>
          <div class="input-group" style="max-width: 300px;">
            <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control" placeholder="Search SKU or Product...">
          </div>
        </div>

        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th class="ps-4">SKU Code</th><th>Product Name</th><th>Supplier</th><th>Agreed Rate</th><th>Lead Time</th><th>Min Qty</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of catalogsData">
                  <td class="ps-4"><span class="badge badge-code rounded-1">{{ item.sku }}</span></td>
                  <td class="fw-bold">{{ item.product }}</td>
                  <td>{{ item.supplier }}</td>
                  <td class="text-success fw-bold">{{ item.rate }}</td>
                  <td>{{ item.leadTime }}</td>
                  <td>{{ item.minQty }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ng-template>

      <app-modal [open]="showModal" (closed)="showModal = false">
        <span modal-title><i class="fas fa-file-invoice-dollar text-primary me-2"></i>Draft New Purchase Order</span>
        <div class="card-custom p-4 mb-4 shadow-sm border-0">
          <h6 class="fw-bold text-primary border-bottom pb-2 mb-3">Order Routing</h6>
          <div class="row g-3">
            <div class="col-md-4"><label class="form-label text-muted small fw-bold">Select Vendor / Supplier</label><select class="form-select"><option>SUP-001 | Arun Traders</option><option>SUP-002 | Meena Supplies</option></select></div>
            <div class="col-md-4"><label class="form-label text-muted small fw-bold">Destination DC</label><select class="form-select"><option>DC-1001 | Chennai Hub - Primary</option><option>DC-1002 | Bangalore Secondary</option></select></div>
            <div class="col-md-4"><label class="form-label text-muted small fw-bold">Required By Date</label><input type="date" class="form-control"></div>
          </div>
        </div>
        <div class="card-custom p-4 shadow-sm border-0">
          <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <h6 class="fw-bold text-primary mb-0">Line Items</h6>
            <button type="button" class="btn btn-sm btn-outline-primary"><i class="fas fa-plus me-1"></i> Add Item Row</button>
          </div>
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr><th>Select SKU / Product</th><th style="width: 150px;">Unit Price (Rs)</th><th style="width: 150px;">Quantity</th><th style="width: 150px;">Total (Rs)</th><th style="width: 60px;"></th></tr>
            </thead>
            <tbody>
              <tr>
                <td><select class="form-select"><option>SKU-101 | Copper Wire (1.5mm)</option><option>SKU-105 | Steel Rod (Grade A)</option></select></td>
                <td><input type="number" class="form-control bg-light" value="120" readonly></td>
                <td><input type="number" class="form-control" placeholder="Qty"></td>
                <td><input type="text" class="form-control bg-light" placeholder="0.00" readonly></td>
                <td class="text-center"><i class="fas fa-trash text-danger"></i></td>
              </tr>
            </tbody>
          </table>
          <div class="text-end mt-3"><h5 class="fw-bold mb-0">Estimated PO Value: <span class="text-primary">Rs 0.00</span></h5></div>
        </div>
        <div class="text-end mt-4 pt-3 border-top">
          <button type="button" class="btn btn-light border me-2 px-4" (click)="showModal = false">Cancel</button>
          <button type="button" class="btn btn-primary px-4 shadow-sm" (click)="showModal = false"><i class="fas fa-paper-plane me-2"></i> Issue Purchase Order</button>
        </div>
      </app-modal>
    </app-shell>
  `
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
