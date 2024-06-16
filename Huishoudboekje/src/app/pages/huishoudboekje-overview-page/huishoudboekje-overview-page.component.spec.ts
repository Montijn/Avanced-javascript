import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjeOverviewPageComponent } from './huishoudboekje-overview-page.component';
import { ActivatedRoute } from '@angular/router';

describe('HuishoudboekjeOverviewPageComponent', () => {
  let component: HuishoudboekjeOverviewPageComponent;
  let fixture: ComponentFixture<HuishoudboekjeOverviewPageComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'categoryId'
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [HuishoudboekjeOverviewPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HuishoudboekjeOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
