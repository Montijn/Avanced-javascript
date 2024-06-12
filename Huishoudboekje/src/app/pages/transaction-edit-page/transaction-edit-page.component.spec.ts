import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditPageComponent } from './transaction-edit-page.component';

describe('TransactionEditPageComponent', () => {
  let component: TransactionEditPageComponent;
  let fixture: ComponentFixture<TransactionEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});