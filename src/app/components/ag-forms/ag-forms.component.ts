import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ag-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ag-forms.component.html',
  styleUrl: './ag-forms.component.sass'
})
export class AgFormsComponent {
  favoriteColorControl = new FormControl();
  secondFavoriteColor = '';
}
