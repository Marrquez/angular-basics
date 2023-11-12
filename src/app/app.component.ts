import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OnlyAge, ProfileInterface, UserInterface, Wrapped } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'angular-basics';

  constructor(){}

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
}
