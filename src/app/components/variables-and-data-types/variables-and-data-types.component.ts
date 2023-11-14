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
  @Input({ required: true }) bankName: string;

  constructor(){
    this.bankName = 'This bank has a name';
  }

  ngOnInit () {
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
