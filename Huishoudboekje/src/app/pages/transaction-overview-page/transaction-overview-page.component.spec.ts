import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOverviewPageComponent } from './transaction-overview-page.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TransactionOverviewPageComponent', () => {
  let component: TransactionOverviewPageComponent;
  let fixture: ComponentFixture<TransactionOverviewPageComponent>;
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
      imports: [TransactionOverviewPageComponent, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
