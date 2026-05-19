import {
  ApplicationRef,
  Component,
  ComponentRef,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ModalComponent
 *
 * Teleports the backdrop + dialog DOM to document.body on open,
 * completely escaping any parent stacking context (shell, sidebar, etc.)
 * Uses a hidden <ng-template> to capture projected content,
 * then moves the rendered overlay into a fresh div on <body>.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Portal anchor: content is projected here then moved to body -->
    <ng-template #overlayTpl>
      <div class="manlog-backdrop" (click)="closed.emit()"></div>
      <div class="manlog-modal-wrap">
        <div class="manlog-dialog">
          <div class="modal-content border-0">

            <div class="modal-header" [ngClass]="headerClass">
              <h5 class="modal-title fw-bold" [ngClass]="titleClass">
                <ng-container *ngTemplateOutlet="titleSlot"></ng-container>
              </h5>
              <button type="button" class="btn-close"
                [ngClass]="closeButtonClass"
                aria-label="Close"
                (click)="closed.emit()">
              </button>
            </div>

            <div class="modal-body p-4" [ngClass]="bodyClass">
              <ng-container *ngTemplateOutlet="bodySlot"></ng-container>
            </div>

          </div>
        </div>
      </div>
    </ng-template>

    <!-- Slot collectors (invisible) -->
    <ng-template #titleSlot><ng-content select="[modal-title]"></ng-content></ng-template>
    <ng-template #bodySlot><ng-content></ng-content></ng-template>
  `,
  styles: [`
    :host { display: none; }  /* host element itself is invisible */
  `]
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() headerClass = 'bg-light';
  @Input() titleClass = 'text-dark';
  @Input() closeButtonClass = '';
  @Input() bodyClass = '';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('overlayTpl', { static: true }) overlayTpl!: TemplateRef<void>;

  private readonly vcr = inject(ViewContainerRef);
  private portalEl: HTMLElement | null = null;
  private embeddedView: ReturnType<ViewContainerRef['createEmbeddedView']> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.open ? this.attach() : this.detach();
    }
  }

  ngOnDestroy(): void {
    this.detach();
  }

  private attach(): void {
    if (this.portalEl) return;

    // Create the overlay template inside our ViewContainerRef
    this.embeddedView = this.vcr.createEmbeddedView(this.overlayTpl);
    this.embeddedView.detectChanges();

    // Wrap all root nodes in a single div
    this.portalEl = document.createElement('div');
    this.portalEl.className = 'manlog-portal';
    for (const node of this.embeddedView.rootNodes) {
      this.portalEl.appendChild(node);
    }

    // Append to body — escapes all stacking contexts
    document.body.appendChild(this.portalEl);
    document.body.style.overflow = 'hidden';
  }

  private detach(): void {
    if (this.embeddedView) {
      this.embeddedView.destroy();
      this.embeddedView = null;
    }
    if (this.portalEl) {
      this.portalEl.remove();
      this.portalEl = null;
    }
    document.body.style.overflow = '';
  }
}
