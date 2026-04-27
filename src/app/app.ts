import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

// Concept: @Component selector, standalone, RouterOutlet
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, LoadingComponent],
  template: `<router-outlet /><app-toast /><app-loading />`,
  styleUrls: ['./app.css']
})
export class App {}
