
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <ng-container *ngIf="open">
      <div class="app-modal-backdrop" (click)="closed.emit()"></div>
      <div class="app-modal">
        <div class="app-modal-dialog">
          <div class="modal-content border-0 shadow-lg">
            <div class="modal-header" [ngClass]="headerClass">
              <h5 class="modal-title fw-bold" [ngClass]="titleClass">
                <ng-content select="[modal-title]"></ng-content>
              </h5>
              <button
                type="button"
                class="btn-close"
                [ngClass]="closeButtonClass"
                aria-label="Close"
                (click)="closed.emit()"
              ></button>
            </div>
            <div class="modal-body" [ngClass]="bodyClass">
              <ng-content></ng-content>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `
})
export class ModalComponent {
    @Input() open = false;
    @Input() headerClass = 'bg-light border-bottom-0';
    @Input() titleClass = 'text-dark';
    @Input() closeButtonClass = '';
    @Input() bodyClass = '';
    @Output() closed = new EventEmitter<void>();
}
