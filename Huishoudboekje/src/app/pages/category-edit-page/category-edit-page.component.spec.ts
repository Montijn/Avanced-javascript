import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditPageComponent } from './category-edit-page.component';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { EditCategoryComponent } from '../../components/category/edit-category/edit-category.component';
import { ActivatedRoute } from '@angular/router';

describe('CategoryEditPageComponent', () => {
  let component: CategoryEditPageComponent;
  let fixture: ComponentFixture<CategoryEditPageComponent>;
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
      imports: [EditCategoryComponent, NavbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
