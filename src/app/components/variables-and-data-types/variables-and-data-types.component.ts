import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyAge, ProfileInterface, UserInterface, Wrapped } from '../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-variables-and-data-types',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './variables-and-data-types.component.html',
  styleUrl: './variables-and-data-types.component.sass'
})
export class VariablesAndDataTypesComponent implements OnInit {
  inputValue = signal('');
  customMap = new Map<string, number>();
  public mapValue = '';
  @Input({ required: true }) bankName: string;

  constructor(){
    this.bankName = 'This bank has a name';
  }

  ngOnInit () {
    // Set values for a map
    this.customMap.set('key_1', 1).set('key_2', 2).set('key_3', 3);

    // Instantiate an object
    const user:UserInterface = {
      id: 'CM',
      name: 'Cristian',
      surname: 'Marquez',
      age: 33,
      getMessage() {
        return 'Welcome ' + this.name;
      }
    };

    let fullName: OnlyAge = user;
    const genericValue: Wrapped<number> = {value: 10};
  
    console.log(this.transforUIIntoPI(user));
    console.log('OnlyAge: ', fullName); 
    console.log('Generic: ', genericValue);

    this.setMapValue();
    this.printUniqueValues();
  }

  setMapValue(): void {
    for(let entry of this.customMap) {
      console.log('Entry in a map object: ', entry);
    }
  }

  printUniqueValues(): void {
    let values = [2, 3, 1, 3, 5, 2, 7, 6, 5, 5 ,2, 9, 0, 4, 8, 8, 8];

    const setObj = new Set(values.sort());
    console.log(setObj);
  }

  transforUIIntoPI(user: UserInterface, isActive: boolean = true): ProfileInterface {
    return {
      name: user.name,
      profileUrl: `/profiles/${user.name}`,
      isActive
    };
  }

  changeTitle(event: Event) {
    const title = (event.target as HTMLInputElement).value;
    this.inputValue.set(title);
  }
}
