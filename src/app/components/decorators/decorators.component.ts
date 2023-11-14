import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('openClose', [
      state('open', style({
        backgroundColor: 'yellow',
        border: '3px solid yellow'
      })),
      state('closed', style({
        backgroundColor: 'red',
        border: '3px solid red'
      })),
      transition('open => closed', [animate('2s')]),
      transition('open => closed', [animate('2s')])
    ])
  ], 
  providers: [
    provideAnimations()
  ],
  templateUrl: './decorators.component.html',
  styleUrl: './decorators.component.sass'
})
export class DecoratorsComponent implements OnInit {
  @HostBinding('style.--width-of-the-square')
  squareWidth = '170px';
  newWidth = 170;

  isOpen = false;

  ngOnInit () {
    
  }

  updateWidth(event: Event): void {
    const newWidth = (event.target as HTMLInputElement).value;
    this.squareWidth = newWidth + 'px';
  }

  toggleColor():void {
    this.isOpen = !this.isOpen;
  }
}
