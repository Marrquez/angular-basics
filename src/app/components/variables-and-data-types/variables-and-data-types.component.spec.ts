import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesAndDataTypesComponent } from './variables-and-data-types.component';

describe('VariablesAndDataTypesComponent', () => {
  let component: VariablesAndDataTypesComponent;
  let fixture: ComponentFixture<VariablesAndDataTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariablesAndDataTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariablesAndDataTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
