import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCompositionComponent } from './component-composition.component';

describe('ComponentCompositionComponent', () => {
  let component: ComponentCompositionComponent;
  let fixture: ComponentFixture<ComponentCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCompositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
