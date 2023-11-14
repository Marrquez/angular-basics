import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LeftSidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [
    provideAnimations()
  ]
})
export class AppComponent {
  title = 'angular-basics';
}
