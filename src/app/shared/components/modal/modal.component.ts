
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    @Input() open = false;
    @Input() headerClass = 'bg-light border-bottom-0';
    @Input() titleClass = 'text-dark';
    @Input() closeButtonClass = '';
    @Input() bodyClass = '';
    @Output() closed = new EventEmitter<void>();
}
