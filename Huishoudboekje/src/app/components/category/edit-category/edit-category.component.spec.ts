import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../models/category.model';
import { of } from 'rxjs';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategory', 'updateCategory']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'categoryId'
        }
      }
    };

    mockCategoryService.getCategory.and.returnValue(of({
      id: 'categoryId',
      huishoudboekjeId: 'huishoudboekjeId',
      name: 'Test Category',
      maxBudget: 100,
      endDate: null
    } as Category));

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatDatepickerModule, MatNativeDateModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateCategory method of CategoryService when onSave is called', async () => {
    const category: Category = {
      id: 'categoryId',
      huishoudboekjeId: 'huishoudboekjeId',
      name: 'Test Category',
      maxBudget: 100,
      endDate: null
    };

    component.category = category;
    component.endDate = new Date('2024-06-16');

    mockCategoryService.updateCategory.and.returnValue(Promise.resolve());

    await component.onSave();

    expect(mockCategoryService.updateCategory).toHaveBeenCalledWith(component.category);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/huishoudboekje', component.category.huishoudboekjeId, 'categories']);
  });
});
