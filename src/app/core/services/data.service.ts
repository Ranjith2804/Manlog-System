import { Injectable } from '@angular/core';

// ── Operation Result ──
export interface OperationResult<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

// ── Shared Interfaces ──
export interface Supplier {
  code: string; name: string; phone: string; email: string; city: string; status: string;
}

export interface DC {
  code: string; name: string; email: string; city: string; status: string;
}

export interface Product {
  name: string; category: string; subCategory: string; sku: string; unit: string;
  rate: number; leadTime: number; minQty: number; status: string;
  supplierCode: string;
}

export interface POLineItem {
  sku: string; product: string; unitPrice: number; quantity: number; total: number;
}

export interface PurchaseOrder {
  id: string; date: string; supplierCode: string; supplierName: string;
  dcCode: string; dcName: string; value: number;
  status: 'Pending Supplier' | 'Accepted' | 'Shipped (In Transit)' | 'Received at DC' | 'Declined';
  items: POLineItem[];
  requiredDate: string;
}

export interface ReceiptItem {
  sku: string; product: string; expected: number; received: number; damaged: number;
}

export interface Receipt {
  id: string; poId: string; shipment: string; vehicle: string; date: string;
  supplierName: string; status: 'Pending Verification' | 'Verified';
  items: ReceiptItem[];
}

export interface InventoryItem {
  sku: string; product: string; category: string; available: number; blocked: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  // ── Counters ──
  private nextSupplierCode = 5;
  private nextDCCode = 1006;
  private nextPoNumber = 1016;
  private nextReceiptId = 1005;
  private nextShipmentId = 5036;
  private nextSku = 116;

  // ── Master Data ──
  suppliers: Supplier[] = [
    { code: 'SUP-001', name: 'Arun Traders', phone: '+91 9876543210', email: 'arun@traders.com', city: 'Chennai, TN', status: 'Active' },
    { code: 'SUP-002', name: 'Meena Supplies', phone: '+91 9123456780', email: 'contact@meenasupplies.com', city: 'Bangalore, KA', status: 'Active' },
    { code: 'SUP-003', name: 'Vikram Electricals', phone: '+91 9551234567', email: 'info@vikramelectricals.com', city: 'Hyderabad, TS', status: 'Active' },
    { code: 'SUP-004', name: 'Rajesh Hardware Co.', phone: '+91 9445567890', email: 'sales@rajeshhardware.in', city: 'Coimbatore, TN', status: 'Inactive' }
  ];

  dcs: DC[] = [
    { code: 'DC-1001', name: 'Chennai Hub - Primary', email: 'chennai.hub@manlog.com', city: 'Chennai, TN', status: 'Active' },
    { code: 'DC-1002', name: 'Bangalore Secondary', email: 'blr.sec@manlog.com', city: 'Bangalore, KA', status: 'Active' },
    { code: 'DC-1003', name: 'Hyderabad Central', email: 'hyd.central@manlog.com', city: 'Hyderabad, TS', status: 'Active' },
    { code: 'DC-1004', name: 'Coimbatore West', email: 'cbe.west@manlog.com', city: 'Coimbatore, TN', status: 'Active' },
    { code: 'DC-1005', name: 'Mumbai Freight Hub', email: 'mumbai.freight@manlog.com', city: 'Mumbai, MH', status: 'Inactive' }
  ];

  categories: string[] = ['Electrical', 'Construction', 'Plumbing'];

  products: Product[] = [
    { name: 'Copper Wire (1.5mm)', category: 'Electrical', subCategory: 'Cables', sku: 'SKU-101', unit: 'Meter', rate: 120, leadTime: 5, minQty: 100, status: 'Active', supplierCode: 'SUP-001' },
    { name: 'Steel Rod (Grade A)', category: 'Construction', subCategory: 'Raw Material', sku: 'SKU-105', unit: 'Kg', rate: 75, leadTime: 7, minQty: 500, status: 'Active', supplierCode: 'SUP-001' },
    { name: 'Ball Valve', category: 'Plumbing', subCategory: 'Valves', sku: 'SKU-108', unit: 'Piece', rate: 220, leadTime: 4, minQty: 80, status: 'Active', supplierCode: 'SUP-002' },
    { name: 'PVC Pipe (4 inch)', category: 'Plumbing', subCategory: 'Pipes', sku: 'SKU-110', unit: 'Meter', rate: 95, leadTime: 3, minQty: 200, status: 'Active', supplierCode: 'SUP-003' },
    { name: 'LED Panel Light', category: 'Electrical', subCategory: 'Lighting', sku: 'SKU-112', unit: 'Piece', rate: 450, leadTime: 6, minQty: 50, status: 'Active', supplierCode: 'SUP-003' },
    { name: 'Cement (OPC 53)', category: 'Construction', subCategory: 'Binding Material', sku: 'SKU-115', unit: 'Bag', rate: 380, leadTime: 2, minQty: 100, status: 'Active', supplierCode: 'SUP-004' }
  ];

  // ── Transactions ──
  purchaseOrders: PurchaseOrder[] = [
    {
      id: 'PO-2026-1001', date: '24-Feb-2026', supplierCode: 'SUP-001', supplierName: 'Arun Traders',
      dcCode: 'DC-1001', dcName: 'Chennai Hub - Primary', value: 24000,
      status: 'Pending Supplier',
      items: [{ sku: 'SKU-101', product: 'Copper Wire (1.5mm)', unitPrice: 120, quantity: 200, total: 24000 }],
      requiredDate: '2026-03-01'
    },
    {
      id: 'PO-2026-0985', date: '15-Feb-2026', supplierCode: 'SUP-001', supplierName: 'Arun Traders',
      dcCode: 'DC-1002', dcName: 'Bangalore Secondary', value: 60000,
      status: 'Shipped (In Transit)',
      items: [{ sku: 'SKU-105', product: 'Steel Rod (Grade A)', unitPrice: 75, quantity: 800, total: 60000 }],
      requiredDate: '2026-02-28'
    },
    {
      id: 'PO-2026-0902', date: '01-Feb-2026', supplierCode: 'SUP-002', supplierName: 'Meena Supplies',
      dcCode: 'DC-1001', dcName: 'Chennai Hub - Primary', value: 115000,
      status: 'Received at DC',
      items: [
        { sku: 'SKU-101', product: 'Copper Wire (1.5mm)', unitPrice: 120, quantity: 500, total: 60000 },
        { sku: 'SKU-105', product: 'Steel Rod (Grade A)', unitPrice: 75, quantity: 733, total: 54975 }
      ],
      requiredDate: '2026-02-15'
    },
    {
      id: 'PO-2026-1010', date: '18-Apr-2026', supplierCode: 'SUP-003', supplierName: 'Vikram Electricals',
      dcCode: 'DC-1003', dcName: 'Hyderabad Central', value: 36000,
      status: 'Pending Supplier',
      items: [{ sku: 'SKU-112', product: 'LED Panel Light', unitPrice: 450, quantity: 80, total: 36000 }],
      requiredDate: '2026-05-01'
    },
    {
      id: 'PO-2026-1012', date: '20-Apr-2026', supplierCode: 'SUP-004', supplierName: 'Rajesh Hardware Co.',
      dcCode: 'DC-1004', dcName: 'Coimbatore West', value: 76000,
      status: 'Pending Supplier',
      items: [{ sku: 'SKU-115', product: 'Cement (OPC 53)', unitPrice: 380, quantity: 200, total: 76000 }],
      requiredDate: '2026-05-05'
    },
    {
      id: 'PO-2026-1015', date: '22-Apr-2026', supplierCode: 'SUP-002', supplierName: 'Meena Supplies',
      dcCode: 'DC-1005', dcName: 'Mumbai Freight Hub', value: 28500,
      status: 'Shipped (In Transit)',
      items: [{ sku: 'SKU-110', product: 'PVC Pipe (4 inch)', unitPrice: 95, quantity: 300, total: 28500 }],
      requiredDate: '2026-05-10'
    }
  ];

  receipts: Receipt[] = [
    {
      id: 'RCPT-1001', poId: 'PO-2026-0985', shipment: 'SHP-5022', vehicle: 'TN-01-AB-1234', date: '24-Feb-2026',
      supplierName: 'Arun Traders', status: 'Pending Verification',
      items: [
        { sku: 'SKU-101', product: 'Copper Wire', expected: 200, received: 200, damaged: 0 },
        { sku: 'SKU-105', product: 'Steel Rod', expected: 500, received: 495, damaged: 5 }
      ]
    },
    {
      id: 'RCPT-1002', poId: 'PO-2026-0902', shipment: 'SHP-5025', vehicle: 'MH-12-XY-9876', date: '24-Feb-2026',
      supplierName: 'Meena Supplies', status: 'Pending Verification',
      items: [{ sku: 'SKU-108', product: 'Ball Valve', expected: 100, received: 100, damaged: 0 }]
    },
    {
      id: 'RCPT-1003', poId: 'PO-2026-1010', shipment: 'SHP-5031', vehicle: 'KA-05-MN-4455', date: '20-Apr-2026',
      supplierName: 'Vikram Electricals', status: 'Pending Verification',
      items: [
        { sku: 'SKU-112', product: 'LED Panel Light', expected: 80, received: 80, damaged: 0 },
        { sku: 'SKU-110', product: 'PVC Pipe (4 inch)', expected: 300, received: 295, damaged: 5 }
      ]
    },
    {
      id: 'RCPT-1004', poId: 'PO-2026-1012', shipment: 'SHP-5035', vehicle: 'TN-09-CD-7788', date: '22-Apr-2026',
      supplierName: 'Rajesh Hardware Co.', status: 'Pending Verification',
      items: [{ sku: 'SKU-115', product: 'Cement (OPC 53)', expected: 200, received: 200, damaged: 0 }]
    }
  ];

  inventory: InventoryItem[] = [
    { sku: 'SKU-101', product: 'Copper Wire (1.5mm)', category: 'Electrical', available: 1250, blocked: 50 },
    { sku: 'SKU-105', product: 'Steel Rod (Grade A)', category: 'Construction', available: 4500, blocked: 0 },
    { sku: 'SKU-108', product: 'Ball Valve', category: 'Plumbing', available: 15, blocked: 5 },
    { sku: 'SKU-110', product: 'PVC Pipe (4 inch)', category: 'Plumbing', available: 820, blocked: 30 },
    { sku: 'SKU-112', product: 'LED Panel Light', category: 'Electrical', available: 340, blocked: 10 },
    { sku: 'SKU-115', product: 'Cement (OPC 53)', category: 'Construction', available: 2100, blocked: 0 }
  ];

  // ── Supplier CRUD ──
  addSupplier(s: Omit<Supplier, 'code'>): OperationResult<Supplier> {
    try {
      if (!s.name?.trim()) return { success: false, message: 'Supplier name is required' };
      if (!s.email?.trim()) return { success: false, message: 'Supplier email is required' };
      if (this.suppliers.some(x => x.email.toLowerCase() === s.email.toLowerCase())) {
        return { success: false, message: `Supplier with email "${s.email}" already exists` };
      }
      const supplier: Supplier = { ...s, code: `SUP-${String(this.nextSupplierCode++).padStart(3, '0')}` };
      this.suppliers.push(supplier);
      return { success: true, message: `Supplier "${supplier.name}" (${supplier.code}) added successfully`, data: supplier };
    } catch (e) {
      return { success: false, message: `Failed to add supplier: ${(e as Error).message}` };
    }
  }

  updateSupplier(code: string, data: Partial<Supplier>): OperationResult {
    try {
      const idx = this.suppliers.findIndex(s => s.code === code);
      if (idx === -1) return { success: false, message: `Supplier "${code}" not found` };
      if (data.email) {
        const dup = this.suppliers.find(s => s.code !== code && s.email.toLowerCase() === data.email!.toLowerCase());
        if (dup) return { success: false, message: `Email "${data.email}" is already used by ${dup.name}` };
      }
      Object.assign(this.suppliers[idx], data);
      return { success: true, message: `Supplier "${this.suppliers[idx].name}" updated successfully` };
    } catch (e) {
      return { success: false, message: `Failed to update supplier: ${(e as Error).message}` };
    }
  }

  deleteSupplier(code: string): OperationResult {
    try {
      const supplier = this.suppliers.find(s => s.code === code);
      if (!supplier) return { success: false, message: `Supplier "${code}" not found` };
      const activePOs = this.purchaseOrders.filter(po => po.supplierCode === code && po.status !== 'Received at DC' && po.status !== 'Declined');
      if (activePOs.length > 0) {
        return { success: false, message: `Cannot delete "${supplier.name}" — ${activePOs.length} active PO(s) exist` };
      }
      this.suppliers = this.suppliers.filter(s => s.code !== code);
      return { success: true, message: `Supplier "${supplier.name}" deleted successfully` };
    } catch (e) {
      return { success: false, message: `Failed to delete supplier: ${(e as Error).message}` };
    }
  }

  // ── DC CRUD ──
  addDC(d: Omit<DC, 'code'>): OperationResult<DC> {
    try {
      if (!d.name?.trim()) return { success: false, message: 'DC name is required' };
      if (!d.email?.trim()) return { success: false, message: 'DC email is required' };
      if (this.dcs.some(x => x.email.toLowerCase() === d.email.toLowerCase())) {
        return { success: false, message: `DC with email "${d.email}" already exists` };
      }
      const dc: DC = { ...d, code: `DC-${this.nextDCCode++}` };
      this.dcs.push(dc);
      return { success: true, message: `DC "${dc.name}" (${dc.code}) added successfully`, data: dc };
    } catch (e) {
      return { success: false, message: `Failed to add DC: ${(e as Error).message}` };
    }
  }

  updateDC(code: string, data: Partial<DC>): OperationResult {
    try {
      const idx = this.dcs.findIndex(d => d.code === code);
      if (idx === -1) return { success: false, message: `DC "${code}" not found` };
      if (data.email) {
        const dup = this.dcs.find(d => d.code !== code && d.email.toLowerCase() === data.email!.toLowerCase());
        if (dup) return { success: false, message: `Email "${data.email}" is already used by ${dup.name}` };
      }
      Object.assign(this.dcs[idx], data);
      return { success: true, message: `DC "${this.dcs[idx].name}" updated successfully` };
    } catch (e) {
      return { success: false, message: `Failed to update DC: ${(e as Error).message}` };
    }
  }

  deleteDC(code: string): OperationResult {
    try {
      const dc = this.dcs.find(d => d.code === code);
      if (!dc) return { success: false, message: `DC "${code}" not found` };
      const activePOs = this.purchaseOrders.filter(po => po.dcCode === code && po.status !== 'Received at DC' && po.status !== 'Declined');
      if (activePOs.length > 0) {
        return { success: false, message: `Cannot delete "${dc.name}" — ${activePOs.length} active PO(s) reference this DC` };
      }
      this.dcs = this.dcs.filter(d => d.code !== code);
      return { success: true, message: `DC "${dc.name}" deleted successfully` };
    } catch (e) {
      return { success: false, message: `Failed to delete DC: ${(e as Error).message}` };
    }
  }

  // ── Product CRUD ──
  addProduct(p: Omit<Product, 'sku'>): OperationResult<Product> {
    try {
      if (!p.name?.trim()) return { success: false, message: 'Product name is required' };
      if (!p.category?.trim()) return { success: false, message: 'Product category is required' };
      if (p.rate <= 0) return { success: false, message: 'Rate must be greater than zero' };
      if (p.minQty <= 0) return { success: false, message: 'Minimum quantity must be greater than zero' };
      const supplier = this.suppliers.find(s => s.code === p.supplierCode);
      if (!supplier) return { success: false, message: `Supplier "${p.supplierCode}" not found` };
      const product: Product = { ...p, sku: `SKU-${this.nextSku++}` };
      this.products.push(product);
      if (!this.inventory.find(i => i.sku === product.sku)) {
        this.inventory.push({ sku: product.sku, product: product.name, category: product.category, available: 0, blocked: 0 });
      }
      return { success: true, message: `Product "${product.name}" (${product.sku}) added to catalog`, data: product };
    } catch (e) {
      return { success: false, message: `Failed to add product: ${(e as Error).message}` };
    }
  }

  deleteProduct(sku: string): OperationResult {
    try {
      const product = this.products.find(p => p.sku === sku);
      if (!product) return { success: false, message: `Product "${sku}" not found` };
      const activePOs = this.purchaseOrders.filter(po =>
        po.status !== 'Received at DC' && po.status !== 'Declined' &&
        po.items.some(i => i.sku === sku)
      );
      if (activePOs.length > 0) {
        return { success: false, message: `Cannot delete "${product.name}" — referenced in ${activePOs.length} active PO(s)` };
      }
      this.products = this.products.filter(p => p.sku !== sku);
      return { success: true, message: `Product "${product.name}" deleted successfully` };
    } catch (e) {
      return { success: false, message: `Failed to delete product: ${(e as Error).message}` };
    }
  }

  addCategory(name: string): OperationResult {
    try {
      if (!name?.trim()) return { success: false, message: 'Category name is required' };
      if (this.categories.includes(name)) return { success: false, message: `Category "${name}" already exists` };
      this.categories.push(name);
      return { success: true, message: `Category "${name}" created successfully` };
    } catch (e) {
      return { success: false, message: `Failed to add category: ${(e as Error).message}` };
    }
  }

  // ── Purchase Order ──
  createPO(supplierCode: string, dcCode: string, requiredDate: string, items: POLineItem[]): OperationResult<PurchaseOrder> {
    try {
      const supplier = this.suppliers.find(s => s.code === supplierCode);
      if (!supplier) return { success: false, message: `Supplier "${supplierCode}" not found` };
      if (supplier.status !== 'Active') return { success: false, message: `Supplier "${supplier.name}" is inactive` };
      const dc = this.dcs.find(d => d.code === dcCode);
      if (!dc) return { success: false, message: `DC "${dcCode}" not found` };
      if (dc.status !== 'Active') return { success: false, message: `DC "${dc.name}" is inactive` };
      if (!items || items.length === 0) return { success: false, message: 'At least one line item is required' };
      if (!requiredDate) return { success: false, message: 'Required delivery date is mandatory' };

      const invalidItems = items.filter(i => i.quantity <= 0 || i.unitPrice <= 0);
      if (invalidItems.length > 0) return { success: false, message: 'All line items must have valid quantity and price' };

      const value = items.reduce((s, i) => s + i.total, 0);
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');

      const po: PurchaseOrder = {
        id: `PO-2026-${this.nextPoNumber++}`,
        date: dateStr,
        supplierCode, supplierName: supplier.name,
        dcCode, dcName: dc.name,
        value, status: 'Pending Supplier',
        items: [...items],
        requiredDate
      };
      this.purchaseOrders.unshift(po);
      return { success: true, message: `PO ${po.id} created — Total: Rs ${value.toLocaleString('en-IN')}`, data: po };
    } catch (e) {
      return { success: false, message: `Failed to create PO: ${(e as Error).message}` };
    }
  }

  deletePO(id: string): OperationResult {
    try {
      const po = this.purchaseOrders.find(p => p.id === id);
      if (!po) return { success: false, message: `PO "${id}" not found` };
      if (po.status === 'Shipped (In Transit)') {
        return { success: false, message: `Cannot delete ${id} — shipment is in transit` };
      }
      if (po.status === 'Received at DC') {
        return { success: false, message: `Cannot delete ${id} — already received at DC` };
      }
      this.purchaseOrders = this.purchaseOrders.filter(p => p.id !== id);
      return { success: true, message: `PO ${id} deleted successfully` };
    } catch (e) {
      return { success: false, message: `Failed to delete PO: ${(e as Error).message}` };
    }
  }

  // ── Supplier accepts PO → generates receipt at DC ──
  acceptPO(poId: string): OperationResult<Receipt> {
    try {
      const po = this.purchaseOrders.find(p => p.id === poId);
      if (!po) return { success: false, message: `PO "${poId}" not found` };
      if (po.status !== 'Pending Supplier') {
        return { success: false, message: `PO ${poId} cannot be accepted — current status: "${po.status}"` };
      }

      // Transaction: update PO status + create receipt atomically
      const prevStatus = po.status;
      po.status = 'Shipped (In Transit)';

      const vehicles = ['TN-01-AB-1234', 'KA-05-MN-4455', 'MH-12-XY-9876', 'TN-09-CD-7788', 'AP-07-FG-3322'];
      const receipt: Receipt = {
        id: `RCPT-${this.nextReceiptId++}`,
        poId: po.id,
        shipment: `SHP-${this.nextShipmentId++}`,
        vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
        supplierName: po.supplierName,
        status: 'Pending Verification',
        items: po.items.map(i => ({
          sku: i.sku, product: i.product, expected: i.quantity, received: i.quantity, damaged: 0
        }))
      };

      try {
        this.receipts.push(receipt);
      } catch (innerErr) {
        // Rollback PO status if receipt creation fails
        po.status = prevStatus;
        return { success: false, message: `Failed to generate shipment for ${poId} — PO status rolled back` };
      }

      return { success: true, message: `PO ${poId} accepted — Shipment ${receipt.shipment} generated for DC`, data: receipt };
    } catch (e) {
      return { success: false, message: `Failed to accept PO: ${(e as Error).message}` };
    }
  }

  declinePO(poId: string): OperationResult {
    try {
      const po = this.purchaseOrders.find(p => p.id === poId);
      if (!po) return { success: false, message: `PO "${poId}" not found` };
      if (po.status !== 'Pending Supplier') {
        return { success: false, message: `PO ${poId} cannot be declined — current status: "${po.status}"` };
      }
      po.status = 'Declined';
      return { success: true, message: `PO ${poId} has been declined` };
    } catch (e) {
      return { success: false, message: `Failed to decline PO: ${(e as Error).message}` };
    }
  }

  // ── DC verifies receipt → updates inventory & PO status ──
  verifyReceipt(receiptId: string): OperationResult {
    try {
      const receipt = this.receipts.find(r => r.id === receiptId);
      if (!receipt) return { success: false, message: `Receipt "${receiptId}" not found` };
      if (receipt.status === 'Verified') return { success: false, message: `Receipt ${receiptId} is already verified` };

      // Validate received quantities
      for (const item of receipt.items) {
        if (item.received < 0) return { success: false, message: `Received qty for ${item.sku} cannot be negative` };
        if (item.damaged < 0) return { success: false, message: `Damaged qty for ${item.sku} cannot be negative` };
        if (item.damaged > item.received) return { success: false, message: `Damaged qty (${item.damaged}) exceeds received qty (${item.received}) for ${item.sku}` };
      }

      // Transaction: mark verified + update inventory + update PO
      const prevStatus = receipt.status;
      receipt.status = 'Verified';

      try {
        for (const item of receipt.items) {
          let inv = this.inventory.find(i => i.sku === item.sku);
          if (!inv) {
            const prod = this.products.find(p => p.sku === item.sku);
            inv = { sku: item.sku, product: prod?.name ?? item.product, category: prod?.category ?? 'Other', available: 0, blocked: 0 };
            this.inventory.push(inv);
          }
          inv.available += (item.received - item.damaged);
          inv.blocked += item.damaged;
        }
      } catch (innerErr) {
        // Rollback receipt status
        receipt.status = prevStatus;
        return { success: false, message: `Inventory update failed — receipt ${receiptId} rolled back` };
      }

      const po = this.purchaseOrders.find(p => p.id === receipt.poId);
      if (po) po.status = 'Received at DC';

      const totalReceived = receipt.items.reduce((s, i) => s + i.received, 0);
      const totalDamaged = receipt.items.reduce((s, i) => s + i.damaged, 0);
      return {
        success: true,
        message: `Receipt ${receiptId} verified — ${totalReceived} units received, ${totalDamaged} damaged. Inventory updated.`
      };
    } catch (e) {
      return { success: false, message: `Failed to verify receipt: ${(e as Error).message}` };
    }
  }

  // ── Helpers ──
  getActiveSuppliers(): Supplier[] {
    return this.suppliers.filter(s => s.status === 'Active');
  }

  getActiveDCs(): DC[] {
    return this.dcs.filter(d => d.status === 'Active');
  }

  getProductsBySupplier(supplierCode: string): Product[] {
    return this.products.filter(p => p.supplierCode === supplierCode);
  }

  getOrdersForSupplier(supplierCode: string): PurchaseOrder[] {
    return this.purchaseOrders.filter(po => po.supplierCode === supplierCode);
  }

  getInventoryTotal(sku: string): number {
    const inv = this.inventory.find(i => i.sku === sku);
    return inv ? inv.available + inv.blocked : 0;
  }
}
