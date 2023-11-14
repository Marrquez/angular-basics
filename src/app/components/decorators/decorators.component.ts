import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './decorators.component.html',
  styleUrl: './decorators.component.sass'
})
export class DecoratorsComponent implements OnInit {
  @HostBinding('style.--width-of-the-square')
  squareWidth = '270px';

  newWidth = 270;

  ngOnInit () {
    
  }

  updateWidth(event: Event): void {
    const newWidth = (event.target as HTMLInputElement).value;
    this.squareWidth = newWidth + 'px';
  }
}
