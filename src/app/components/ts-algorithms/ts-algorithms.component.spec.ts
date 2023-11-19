import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgFormsComponent } from './ag-forms.component';

describe('AgFormsComponent', () => {
  let component: AgFormsComponent;
  let fixture: ComponentFixture<AgFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
