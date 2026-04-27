import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = 0;
  isLoading = false;

  show(): void {
    this.activeRequests++;
    this.isLoading = true;
  }

  hide(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    if (this.activeRequests === 0) {
      this.isLoading = false;
    }
  }

  /** Wrap an async operation with loading state */
  async wrap<T>(fn: () => Promise<T>): Promise<T> {
    this.show();
    try {
      return await fn();
    } finally {
      this.hide();
    }
  }

  /** Simulate async delay (for demo, mimics network latency) */
  async simulate(ms = 400): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
