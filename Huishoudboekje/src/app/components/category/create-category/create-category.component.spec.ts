import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateCategoryComponent } from './create-category.component';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';

let mockCategoryService = {
  addCategory: () => {}
};

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
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
      imports: [FormsModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call addCategory method of CategoryService when onAdd is called', () => {
    let spy = spyOn(mockCategoryService, 'addCategory').and.callThrough(); // Create spy and retain original method

    component.category = {
      id: '',
      huishoudboekjeId: '1',
      maxBudget: 100,
      name: 'Test Category',
      endDate: null
    };

    component.onAdd();

    expect(spy).toHaveBeenCalled();
  });
});
