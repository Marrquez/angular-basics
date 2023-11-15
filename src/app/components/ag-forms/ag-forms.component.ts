import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { ExponentialStrengthPipe } from '../../pipes/exponential-strength.pipe';

@Component({
  selector: 'app-ag-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DatePipe, ExponentialStrengthPipe],
  templateUrl: './ag-forms.component.html',
  styleUrl: './ag-forms.component.sass'
})
export class AgFormsComponent {  
  favoriteColorControl = new FormControl();
  secondFavoriteColor = '';
  myBday = new Date(1989, 12, 25);
 
  get fcValue():number {
    return this.favoriteColorControl.value;
  }
}
