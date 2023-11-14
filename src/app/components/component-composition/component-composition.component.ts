import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectContentComponent } from './project-content/project-content.component';

@Component({
  selector: 'app-component-composition',
  standalone: true,
  imports: [CommonModule, ProjectContentComponent],
  templateUrl: './component-composition.component.html',
  styleUrl: './component-composition.component.sass' 
})
export class ComponentCompositionComponent {
  divName = 'A';
     
  updateDiv(event: Event): void {
    const divName = (event.target as HTMLInputElement).value;
    this.divName = divName; 
  } 
}
