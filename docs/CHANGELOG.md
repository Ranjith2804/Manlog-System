# ManLog System — Change Documentation

> **Branch:** `feature/user/Nowshaath`
> **Date:** April 26, 2026
> **Author:** Nowshaath Agbar

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Home Page Fixes](#2-home-page-fixes)
3. [Login Page](#3-login-page)
4. [Admin Page — Full Audit & Fix](#4-admin-page--full-audit--fix)
5. [Procurement Page — Full Audit & Fix](#5-procurement-page--full-audit--fix)
6. [Supplier Page — Full Audit & Fix](#6-supplier-page--full-audit--fix)
7. [DC Dashboard Page — Full Audit & Fix](#7-dc-dashboard-page--full-audit--fix)
8. [Modal Component Fix](#8-modal-component-fix)
9. [Shared DataService — Central State Management](#9-shared-dataservice--central-state-management)
10. [Toast Notification System](#10-toast-notification-system)
11. [Loading Overlay System](#11-loading-overlay-system)
12. [Error Handling & Transaction Mechanism](#12-error-handling--transaction-mechanism)
13. [Sample Data Added](#13-sample-data-added)
14. [Data Flow Architecture](#14-data-flow-architecture)
15. [Files Modified / Created](#15-files-modified--created)

---

## 1. Project Setup

- Cloned repository from `https://github.com/Ranjith2804/Manlog-System.git`
- Created feature branch `feature/user/Nowshaath`
- Installed dependencies via `npm install`
- Started dev server on `http://localhost:4200`

---

## 2. Home Page Fixes

**File:** `src/app/features/home/home.component.ts` + `.html`

- Fixed dead navigation links — nav links now point to `#features` / `#cta` sections
- Footer links properly route to sections or `/login`
- Added `id="cta"` to the Call-to-Action section for anchor navigation

---

## 3. Login Page

**File:** `src/app/features/auth/login/`

- Verified working login with 4 demo credentials:
  | Email | Password | Role |
  |---|---|---|
  | admin@manlog.com | 123 | Admin |
  | procurement@manlog.com | 123 | Procurement |
  | supplier@manlog.com | 123 | Supplier |
  | dc@manlog.com | 123 | DC Manager |
- Role-based routing directs each user to their respective dashboard

---

## 4. Admin Page — Full Audit & Fix

**Files:** `src/app/features/admin/admin-page/admin-page.component.ts` + `.html`

### Changes Made
- Rewired to use shared `DataService` instead of local arrays
- `get suppliers()` / `get dcs()` delegate to `data.suppliers` / `data.dcs`
- `saveRecord()` calls `data.addSupplier()` or `data.addDC()`
- `saveEdit()` calls `data.updateSupplier()` or `data.updateDC()`
- `deleteSupplier()` / `deleteDC()` call corresponding DataService methods
- Added `ToastService` and `LoadingService` integration
- All CRUD operations now show loading spinner + success/error toast notifications
- Async operations with simulated latency for realistic UX

---

## 5. Procurement Page — Full Audit & Fix

**Files:** `src/app/features/procurement/procurement-page/procurement-page.component.ts` + `.html`

### Changes Made
- Rewired to use shared `DataService`
- `get purchaseOrders()` → `data.purchaseOrders`
- `get suppliers()` → maps `data.suppliers` to `{code, label}` format
- `get destinations()` → maps `data.dcs` to `{code, label}` format
- `get skuOptions()` → maps `data.products` to `{key, label, product, price}` format
- `get catalogsData()` → maps `data.products` with supplier name lookup
- Added `badgeClass(status)` method (replaces old per-PO `badgeClass` property)
- Added `formatValue(v: number)` for consistent currency formatting
- `issuePO()` calls `data.createPO()` with validation and toast feedback
- `deletePO()` calls `data.deletePO()` with business rule enforcement
- HTML updated: `po.supplier` → `po.supplierName`, `po.destination` → `po.dcName`, `po.value` → `formatValue(po.value)`
- Supplier/DC dropdowns now bind to code values instead of label strings

---

## 6. Supplier Page — Full Audit & Fix

**Files:** `src/app/features/supplier/supplier-page/supplier-page.component.ts` + `.html`

### Changes Made
- Complete rewrite to use shared `DataService`
- Products filtered by `currentSupplierCode` ('SUP-001') via `data.getProductsBySupplier()`
- Orders fetched via `data.getOrdersForSupplier()`
- `acceptOrder()` calls `data.acceptPO()` — auto-generates receipt at DC
- `declineOrder()` calls `data.declinePO()`
- `saveProduct()` calls `data.addProduct()` with supplier code
- `deleteProduct()` calls `data.deleteProduct()` with business rule checks
- `createCategory()` calls `data.addCategory()`
- HTML updated: `order.destination` → `order.dcName`, value formatting, `badgeClass()` method, `isActionable()` method
- Product form fields changed from `newProduct.name` to `newProductName` (flat fields)
- Product table displays formatted rates (`Rs X.XX`) and lead times (`X Days`)
- Order review modal: item quantities and prices displayed as formatted numbers

---

## 7. DC Dashboard Page — Full Audit & Fix

**Files:** `src/app/features/distribution/dc-dashboard-page/dc-dashboard-page.component.ts` + `.html`

### Changes Made
- Complete rewrite to use shared `DataService`
- `get receipts()` → `data.receipts`
- `get inventory()` → `data.inventory`
- `confirmReceipt()` calls `data.verifyReceipt()` — updates inventory AND marks PO as received
- `inventoryTotal(item)` computes `available + blocked` (replaces old `item.total` field)
- HTML updated: `receipt.supplier` → `receipt.supplierName`, badge class computed inline, `item.total` → `inventoryTotal(item)`
- Added toast and loading integration for receipt verification

---

## 8. Modal Component Fix

**File:** `src/app/shared/components/modal/modal.component.html`

- Close button styled as red outlined circle with Font Awesome X icon
- Positioned absolute top-right of modal header
- Added explicit `background-color: #ffffff` at every CSS level to fix modal transparency issue

**File:** `src/styles.css`

- Modal CSS updated with explicit white backgrounds at `.modal-overlay`, `.modal-content`, and `.modal-body` levels

---

## 9. Shared DataService — Central State Management

**File:** `src/app/core/services/data.service.ts` *(NEW)*

### Purpose
Single source of truth for all application data. `@Injectable({ providedIn: 'root' })` singleton.

### Interfaces Defined
| Interface | Key Fields |
|---|---|
| `Supplier` | code, name, phone, email, city, status |
| `DC` | code, name, email, city, status |
| `Product` | name, category, subCategory, sku, unit, rate, leadTime, minQty, status, supplierCode |
| `PurchaseOrder` | id, date, supplierCode, supplierName, dcCode, dcName, value, status, items, requiredDate |
| `Receipt` | id, poId, shipment, vehicle, date, supplierName, status, items |
| `InventoryItem` | sku, product, category, available, blocked |
| `OperationResult<T>` | success, message, data? |

### CRUD Methods (all return `OperationResult`)
- **Suppliers:** `addSupplier()`, `updateSupplier()`, `deleteSupplier()`
- **DCs:** `addDC()`, `updateDC()`, `deleteDC()`
- **Products:** `addProduct()`, `deleteProduct()`, `addCategory()`
- **POs:** `createPO()`, `deletePO()`, `acceptPO()`, `declinePO()`
- **Receipts:** `verifyReceipt()`

### Helper Methods
- `getActiveSuppliers()`, `getActiveDCs()`
- `getProductsBySupplier(code)`, `getOrdersForSupplier(code)`
- `getInventoryTotal(sku)`

---

## 10. Toast Notification System

### Files Created
- `src/app/core/services/toast.service.ts`
- `src/app/shared/components/toast/toast.component.ts`

### Features
- 4 toast types: `success` (green), `error` (red), `warning` (yellow), `info` (blue)
- Auto-dismiss after 4 seconds
- Slide-in/slide-out animation
- Click to dismiss early
- Stacking support (multiple toasts)
- Color-coded with gradient backgrounds and left border accent
- Font Awesome icons per type
- Fixed position top-right (`z-index: 99999`)

### Usage
```typescript
readonly toast = inject(ToastService);

this.toast.success('Supplier added successfully');
this.toast.error('Cannot delete — active POs exist');
this.toast.warning('Product name is required');
this.toast.info('PO has been declined');
```

---

## 11. Loading Overlay System

### Files Created
- `src/app/core/services/loading.service.ts`
- `src/app/shared/components/loading/loading.component.ts`

### Features
- Full-screen semi-transparent overlay with blur backdrop
- Centered white card with spinning loader + "Processing..." text
- Request counting (`show()`/`hide()`) — nested operations don't flicker
- `simulate(ms)` method for demo latency (mimics network calls)
- `wrap(fn)` helper for wrapping async operations
- Fixed position (`z-index: 99998`)

### Usage
```typescript
readonly loading = inject(LoadingService);

this.loading.show();
await this.loading.simulate(500);
// ... do work ...
this.loading.hide();
```

---

## 12. Error Handling & Transaction Mechanism

### OperationResult Pattern
Every DataService mutation returns:
```typescript
interface OperationResult<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
```

### Input Validation (at service boundary)
| Validation | Where Applied |
|---|---|
| Required fields (name, email, etc.) | addSupplier, addDC, addProduct, addCategory |
| Positive numbers (rate, minQty) | addProduct |
| Duplicate email check | addSupplier, updateSupplier, addDC, updateDC |
| Duplicate category name | addCategory |
| Valid supplier/DC exists | addProduct, createPO |
| Supplier/DC is active | createPO |
| Line items have valid qty/price | createPO |
| Required date present | createPO |
| Receipt qty not negative | verifyReceipt |
| Damaged qty ≤ received qty | verifyReceipt |

### Business Rule Enforcement
| Rule | Method |
|---|---|
| Can't delete supplier with active POs | deleteSupplier() |
| Can't delete DC with active POs | deleteDC() |
| Can't delete product referenced in active POs | deleteProduct() |
| Can't delete PO that's in-transit or received | deletePO() |
| Can only accept POs with status "Pending Supplier" | acceptPO() |
| Can only decline POs with status "Pending Supplier" | declinePO() |
| Can't verify already-verified receipt | verifyReceipt() |

### Transaction Rollback
| Operation | Rollback Behavior |
|---|---|
| `acceptPO()` | If receipt creation fails → PO status rolled back to previous value |
| `verifyReceipt()` | If inventory update fails → receipt status rolled back to "Pending Verification" |

### Try/Catch Wrapping
- Every DataService method wrapped in outer try/catch returning error OperationResult
- Every component method wrapped in try/catch with `toast.error()` fallback
- `finally` blocks ensure `loading.hide()` always runs

---

## 13. Sample Data Added

### Suppliers (4)
| Code | Name | City | Status |
|---|---|---|---|
| SUP-001 | Arun Traders | Chennai, TN | Active |
| SUP-002 | Meena Supplies | Bangalore, KA | Active |
| SUP-003 | Vikram Electricals | Hyderabad, TS | Active |
| SUP-004 | Rajesh Hardware Co. | Coimbatore, TN | Inactive |

### Distribution Centers (5)
| Code | Name | City | Status |
|---|---|---|---|
| DC-1001 | Chennai Hub - Primary | Chennai, TN | Active |
| DC-1002 | Bangalore Secondary | Bangalore, KA | Active |
| DC-1003 | Hyderabad Central | Hyderabad, TS | Active |
| DC-1004 | Coimbatore West | Coimbatore, TN | Active |
| DC-1005 | Mumbai Freight Hub | Mumbai, MH | Inactive |

### Products (6)
| SKU | Product | Category | Supplier | Rate |
|---|---|---|---|---|
| SKU-101 | Copper Wire (1.5mm) | Electrical | SUP-001 | Rs 120 |
| SKU-105 | Steel Rod (Grade A) | Construction | SUP-001 | Rs 75 |
| SKU-108 | Ball Valve | Plumbing | SUP-002 | Rs 220 |
| SKU-110 | PVC Pipe (4 inch) | Plumbing | SUP-003 | Rs 95 |
| SKU-112 | LED Panel Light | Electrical | SUP-003 | Rs 450 |
| SKU-115 | Cement (OPC 53) | Construction | SUP-004 | Rs 380 |

### Purchase Orders (6), Receipts (4), Inventory Items (6)
Pre-populated with various statuses to demonstrate full workflow.

---

## 14. Data Flow Architecture

```
┌──────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────────┐
│  ADMIN   │────▶│ DataService │◀────│PROCUREMENT│    │  SUPPLIER    │
│  Page    │     │ (Singleton) │     │   Page    │    │    Page      │
└──────────┘     │             │     └───────────┘    └──────────────┘
  Add/Edit       │  suppliers  │      Create PO           │
  Suppliers      │  dcs        │         │                │
  & DCs          │  products   │         ▼                ▼
                 │  orders  ◀──┼── PO lands in ──▶ Supplier sees
                 │  receipts   │   supplier's      "Pending" PO
                 │  inventory  │   order list          │
                 │             │                       │ Accept
                 │             │                       ▼
                 │             │              acceptPO() runs:
                 │             │              • PO → "Shipped"
                 │             │              • Receipt created
                 │             │                       │
                 │             │                       ▼
                 │             │     ┌──────────────────────────┐
                 │             │◀────│    DC DASHBOARD           │
                 │             │     │  Sees new receipt         │
                 └─────────────┘     │  Verifies → Inventory ↑  │
                                     └──────────────────────────┘

 Toast & Loading Services inject into every page component
 App root renders <app-toast /> and <app-loading /> globally
```

**Flow Summary:**
1. **Admin** creates Suppliers & DCs
2. **Procurement** creates PO → selects supplier + DC + products
3. **Supplier** sees PO → Accepts → auto-generates shipment receipt
4. **DC** receives shipment → Verifies receipt → Inventory updated + PO marked "Received"

---

## 15. Files Modified / Created

### New Files
| File | Purpose |
|---|---|
| `src/app/core/services/data.service.ts` | Central shared state store |
| `src/app/core/services/toast.service.ts` | Toast notification service |
| `src/app/core/services/loading.service.ts` | Loading overlay service |
| `src/app/shared/components/toast/toast.component.ts` | Toast UI component |
| `src/app/shared/components/loading/loading.component.ts` | Loading UI component |
| `docs/CHANGELOG.md` | This documentation |

### Modified Files
| File | Changes |
|---|---|
| `src/app/app.ts` | Added ToastComponent + LoadingComponent imports & template |
| `src/app/features/admin/admin-page/admin-page.component.ts` | Rewired to DataService + toast + loading |
| `src/app/features/procurement/procurement-page/procurement-page.component.ts` | Rewired to DataService + toast + loading |
| `src/app/features/procurement/procurement-page/procurement-page.component.html` | Updated property bindings for DataService model |
| `src/app/features/supplier/supplier-page/supplier-page.component.ts` | Full rewrite to DataService + toast + loading |
| `src/app/features/supplier/supplier-page/supplier-page.component.html` | Updated property bindings for DataService model |
| `src/app/features/distribution/dc-dashboard-page/dc-dashboard-page.component.ts` | Full rewrite to DataService + toast + loading |
| `src/app/features/distribution/dc-dashboard-page/dc-dashboard-page.component.html` | Updated property bindings for DataService model |
| `src/app/features/home/home.component.ts` + `.html` | Fixed dead navigation links |
| `src/app/shared/components/modal/modal.component.html` | Fixed close button + transparency |
| `src/styles.css` | Modal background fix |
