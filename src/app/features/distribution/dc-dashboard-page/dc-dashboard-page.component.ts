import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { ShellComponent } from '../../../core/layout/shell/shell.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { SidebarItem } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dc-dashboard-page',
  standalone: true,
  imports: [CommonModule, ShellComponent, ModalComponent],
  template: `
    <app-shell
      title="Distribution Center Portal"
      subtitle="Receive shipments and manage facility stock"
      userLabel="Chennai-DC"
      userIcon="fa-user-tie"
      sidebarUserName="Ranjith"
      sidebarSubtitle="DC Manager - Chennai Hub"
      [items]="menuItems"
    >
      <div *ngIf="activeSection === 'receipts'; else inventorySection">
        <div class="d-flex justify-content-between align-items-center mb-3"><h5 class="fw-bold mb-0">Shipments At Gate (Action Required)</h5></div>
        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th class="ps-4">Receipt ID</th><th>Shipment ID</th><th>Vehicle No.</th><th>Arrival Date</th><th>Status</th><th class="text-center">Action</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let receipt of receipts">
                  <td class="ps-4"><span class="badge badge-code rounded-1">{{ receipt.id }}</span></td>
                  <td><span class="badge badge-code rounded-1 text-primary">{{ receipt.shipment }}</span></td>
                  <td class="fw-bold">{{ receipt.vehicle }}</td>
                  <td>{{ receipt.date }}</td>
                  <td><span class="badge rounded-pill badge-soft-warning">{{ receipt.status }}</span></td>
                  <td class="text-center"><button class="btn btn-sm btn-primary fw-bold" type="button" (click)="showVerifyModal = true"><i class="fas fa-check-circle me-1"></i> Verify Receipt</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ng-template #inventorySection>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0">Current Inventory (Chennai Hub)</h5>
          <div class="input-group" style="max-width: 300px;">
            <span class="input-group-text bg-white"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control" placeholder="Search SKU or Product...">
          </div>
        </div>
        <div class="card-custom shadow-sm">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr><th class="ps-4">SKU Code</th><th>Product Name</th><th>Category</th><th class="text-success text-end">Available Qty</th><th class="text-danger text-end">Blocked Qty</th><th class="text-primary text-end pe-4">Total Stock</th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of inventory">
                  <td class="ps-4"><span class="badge badge-code rounded-1">{{ item.sku }}</span></td>
                  <td class="fw-bold">{{ item.product }}</td>
                  <td>{{ item.category }}</td>
                  <td class="text-success text-end fw-bold">{{ item.available }}</td>
                  <td class="text-danger text-end fw-bold">{{ item.blocked }}</td>
                  <td class="text-primary text-end fw-bold pe-4">{{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ng-template>

      <app-modal [open]="showVerifyModal" (closed)="showVerifyModal = false" headerClass="bg-primary text-white" titleClass="text-white" closeButtonClass="btn-close-white">
        <span modal-title><i class="fas fa-clipboard-check me-2"></i>Verify Receipt: RCPT-1001</span>
        <div class="row mb-4 bg-light p-3 rounded mx-1">
          <div class="col-md-4"><p class="mb-1 text-muted small">Linked Shipment:</p><h6 class="fw-bold text-primary">SHP-5022</h6></div>
          <div class="col-md-4"><p class="mb-1 text-muted small">Transport Vehicle:</p><h6 class="fw-bold">TN-01-AB-1234</h6></div>
          <div class="col-md-4"><p class="mb-1 text-muted small">Supplier:</p><h6 class="fw-bold">Arun Traders</h6></div>
        </div>
        <table class="table table-bordered mb-4 align-middle">
          <thead class="table-light"><tr><th>SKU Code</th><th>Expected (Shipped)</th><th style="width: 150px;">Received Qty</th><th style="width: 150px;">Damaged Qty</th></tr></thead>
          <tbody>
            <tr><td><span class="badge badge-code">SKU-101</span><br><small class="text-muted">Copper Wire</small></td><td class="text-center fw-bold">200</td><td><input type="number" class="form-control" value="200" min="0"></td><td><input type="number" class="form-control text-danger border-danger" value="0" min="0"></td></tr>
            <tr><td><span class="badge badge-code">SKU-105</span><br><small class="text-muted">Steel Rod</small></td><td class="text-center fw-bold">500</td><td><input type="number" class="form-control" value="495" min="0"></td><td><input type="number" class="form-control text-danger border-danger" value="5" min="0"></td></tr>
          </tbody>
        </table>
        <div class="mb-3"><label class="form-label text-muted small fw-bold">Receiver's Name (Digital Signature)</label><input type="text" class="form-control" placeholder="Enter your full name to confirm"></div>
        <div class="alert alert-info border-0 text-center small mb-0"><i class="fas fa-info-circle me-1"></i> Confirming this will permanently update <strong>Live Inventory</strong> and mark the PO as received.</div>
        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-outline-secondary px-4" (click)="showVerifyModal = false">Cancel</button>
          <button type="button" class="btn btn-success px-4" (click)="showVerifyModal = false"><i class="fas fa-save me-2"></i> Confirm & Update Stock</button>
        </div>
      </app-modal>
    </app-shell>
  `
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
