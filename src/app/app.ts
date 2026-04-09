import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Concept: @Component selector, standalone, RouterOutlet
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styles: []
})
export class App {}
