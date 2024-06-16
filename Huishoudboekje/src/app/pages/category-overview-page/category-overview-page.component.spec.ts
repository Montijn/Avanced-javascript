import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOverviewPageComponent } from './category-overview-page.component';
import { ActivatedRoute } from '@angular/router';

describe('CategoryOverviewPageComponent', () => {
  let component: CategoryOverviewPageComponent;
  let fixture: ComponentFixture<CategoryOverviewPageComponent>;
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
      imports: [CategoryOverviewPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
