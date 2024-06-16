import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCategoryComponent } from './list-category.component';
import { CategoryService } from '../../../services/category/category.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

const categoryServiceMock = {
  deleteCategory: jasmine.createSpy('deleteCategory')
};

const transactionServiceMock = {
  getTransactions: () => of([
    { categoryId: '1', amount: 50, type: 'expense' },
    { categoryId: '1', amount: 100, type: 'income' },
    { categoryId: '2', amount: 200, type: 'expense' }
  ])
};

const mockCategories = [
  { id: '1', huishoudboekjeId: '1', name: 'Food', maxBudget: 500 },
  { id: '2', huishoudboekjeId: '1', name: 'Transport', maxBudget: 300 }
];

describe('ListCategoryComponent', () => {
  let component: ListCategoryComponent;
  let fixture: ComponentFixture<ListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ListCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCategoryComponent);
    component = fixture.componentInstance;
    component.categories = mockCategories;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transactions on init', () => {
    expect(component.transactions.length).toEqual(3);
  });

  it('should calculate available budget correctly', () => {
    const availableBudget = component.getCategoryAvailableBudget('1');
    expect(availableBudget).toEqual(550); // 500 (maxBudget) + 100 (income) - 50 (expense)
  });

  it('should call deleteCategory on delete', () => {
    component.onDelete(mockCategories[0]);
    expect(categoryServiceMock.deleteCategory).toHaveBeenCalledWith(mockCategories[0]);
  });
});
