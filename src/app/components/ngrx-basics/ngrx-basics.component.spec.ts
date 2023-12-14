import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxBasicsComponent } from './ngrx-basics.component';

describe('NgrxBasicsComponent', () => {
  let component: NgrxBasicsComponent;
  let fixture: ComponentFixture<NgrxBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxBasicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgrxBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
