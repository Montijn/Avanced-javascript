import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOverviewPageComponent } from './category-overview-page.component';

describe('CategoryOverviewPageComponent', () => {
  let component: CategoryOverviewPageComponent;
  let fixture: ComponentFixture<CategoryOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOverviewPageComponent]
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
