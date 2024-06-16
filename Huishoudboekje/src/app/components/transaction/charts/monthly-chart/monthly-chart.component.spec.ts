import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule

import { MonthlyChartComponent } from './monthly-chart.component';

describe('MonthlyChartComponent', () => {
  let component: MonthlyChartComponent;
  let fixture: ComponentFixture<MonthlyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyChartComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    return true
  });
});
