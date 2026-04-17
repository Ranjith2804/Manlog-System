import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  icon: string;
  route?: string;
  active?: boolean;
  actionKey?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() userName = '';
  @Input() subtitle = '';
  @Input() items: SidebarItem[] = [];
  @Output() itemSelected = new EventEmitter<string>();
}
