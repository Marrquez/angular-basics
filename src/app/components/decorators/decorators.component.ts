import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'red'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'orange'
      })),
      transition('open => closed', [animate('.6s')]),
      transition('closed => open', [animate('.6s')])
    ]) 
  ], 
  templateUrl: './decorators.component.html',
  styleUrl: './decorators.component.sass'
})
export class DecoratorsComponent implements OnInit {
  @HostBinding('style.--width-of-the-square')
  squareWidth = '150px';
  newWidth = 150;

  isOpen = false;

  ngOnInit () {
    
  }

  updateWidth(event: Event): void {
    const newWidth = (event.target as HTMLInputElement).value;
    this.squareWidth = newWidth + 'px';
  }

  toggle():void {
    this.isOpen = !this.isOpen;
  }
}
