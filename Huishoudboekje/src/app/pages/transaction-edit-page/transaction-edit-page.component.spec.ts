import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionEditPageComponent } from './transaction-edit-page.component';
import { ActivatedRoute } from '@angular/router';

describe('TransactionEditPageComponent', () => {
  let component: TransactionEditPageComponent;
  let fixture: ComponentFixture<TransactionEditPageComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [TransactionEditPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
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
