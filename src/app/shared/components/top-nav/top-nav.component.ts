import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-top-nav',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './top-nav.component.html'
})
export class TopNavComponent {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() userLabel = '';
    @Input() userIcon = 'fa-user-circle';
    @Output() logout = new EventEmitter<void>();
}