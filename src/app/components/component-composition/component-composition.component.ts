import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectContentComponent } from './project-content/project-content.component';

export interface Address {
  street: String;
  city: String;
  zipCode: String;
}

@Component({
  selector: 'app-address',
  standalone: true,
  template: `<p>{{ address.street }}</p>
             <p>{{ address.city }}</p>
             <p>{{ address.zipCode }}</p>`
})
export class AddressComponent {
  @Input() address: Address = {
    street: '',
    city: '',
    zipCode: ''
  };
  constructor() { }
}

@Component({
  selector: 'app-component-composition',
  standalone: true,
  imports: [CommonModule, ProjectContentComponent, AddressComponent],
  templateUrl: './component-composition.component.html',
  styleUrl: './component-composition.component.sass' 
})
export class ComponentCompositionComponent {
  divName = 'A';
  @Input() addresses: Address[] = [{ street: "Third Avenue", city: "New York", zipCode: "10001" },
                                   { street: "Constitution Avenue", city: "Washington", zipCode: "20001" }];
  
     
  updateDiv(event: Event): void {
    const divName = (event.target as HTMLInputElement).value;
    this.divName = divName; 
  } 
}
