import { Component, HostBinding, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'menu-item', 
  standalone: true,
  template: `<p (click)='updateText()'>The text: {{menuText}}</p>`
})
export class MenuItemComponent {
  @Input() menuText: string = 'Default menu text';
  @Output() updateTextEvent = new EventEmitter();

  updateText(): void {
    this.updateTextEvent.emit('Update from child');
  }
}

@Component({
  selector: 'app-decorators',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuItemComponent], 
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
  menuItemText = 'This is the initial text';
  count = 0;

  @ViewChild('MenuItemComponent') childMenuItem!: MenuItemComponent;

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

  changeText():void {
    this.childMenuItem.menuText = 'Updated using @viewchild: '+ this.count;
    this.count++;
  }

  updateText(): void {
    this.childMenuItem.menuText = 'Updated via @output: '+ this.count;
    this.count++;
  }
}
