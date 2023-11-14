import { Component, OnInit } from '@angular/core';
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

  ngOnInit () {
    
  }
}
