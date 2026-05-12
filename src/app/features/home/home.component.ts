import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  stats = [
    { value: '1,200+', label: 'SKUs Managed' },
    { value: '98.4%', label: 'On-Time Delivery' },
    { value: '4', label: 'Active DC Hubs' },
    { value: '350+', label: 'Supplier Partners' },
  ];

  features = [
    {
      icon: 'shopping_cart',
      title: 'Procurement',
      desc: 'Automate purchase orders and manage vendor selection with data-driven insights.',
    },
    {
      icon: 'local_shipping',
      title: 'Supplier Portal',
      desc: 'A unified gateway for suppliers to update shipping status and manage invoicing.',
    },
    {
      icon: 'warehouse',
      title: 'DC Command Center',
      desc: 'Track inbound receipts, cross-docking, and outgoing freight from one dashboard.',
    },
    {
      icon: 'admin_panel_settings',
      title: 'Enterprise Admin',
      desc: 'Granular access controls and audit logs to keep your network secure and compliant.',
    },
  ];

  steps = [
    {
      number: '01',
      title: 'Procurement Raises PO',
      desc: 'Purchase orders are generated automatically based on inventory thresholds.',
    },
    {
      number: '02',
      title: 'Supplier Ships',
      desc: 'Real-time tracking and e-documentation begins the moment cargo leaves the dock.',
    },
    {
      number: '03',
      title: 'DC Receives',
      desc: 'Automated check-in ensures inventory accuracy within seconds of arrival.',
    },
  ];

  navLinks = [

    { label: 'Features', href: '#' },
    { label: 'Support', href: '#' },
  ];
}
