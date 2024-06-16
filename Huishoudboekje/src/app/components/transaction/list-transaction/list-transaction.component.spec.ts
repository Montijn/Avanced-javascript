import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTransactionComponent } from './list-transaction.component';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { CategoryService } from '../../../services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Timestamp } from 'firebase/firestore';
import { Transaction } from '../../../models/transaction.model';
import { Category } from '../../../models/category.model'; // Adjust path as per your project structure
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule

const mockTransactions: Transaction[] = [
  { 
    id: '1', 
    huishoudboekjeId: '1', 
    categoryId: '1', 
    amount: 50, 
    type: 'expense', 
    date: Timestamp.fromDate(new Date(2024, 0, 15)), 
    description: 'Expense for groceries'
  },
  { 
    id: '2', 
    huishoudboekjeId: '1', 
    categoryId: '2', 
    amount: 100, 
    type: 'income', 
    date: Timestamp.fromDate(new Date(2024, 0, 20)), 
    description: 'Salary received'
  },
  { 
    id: '3', 
    huishoudboekjeId: '1', 
    categoryId: '1', 
    amount: 200, 
    type: 'expense', 
    date: Timestamp.fromDate(new Date(2024, 1, 5)), 
    description: 'Expense for utilities'
  }
];

const mockCategories: Category[] = [
  { id: '1', huishoudboekjeId: '1', name: 'Food', maxBudget: 500 },
  { id: '2', huishoudboekjeId: '1', name: 'Salary', maxBudget: 1000 }
];

describe('ListTransactionComponent', () => {
  let component: ListTransactionComponent;
  let fixture: ComponentFixture<ListTransactionComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['getTransactions', 'deleteTransaction']);
    mockTransactionService.getTransactions.and.returnValue(of(mockTransactions));

    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategories']);
    mockCategoryService.getCategories.and.returnValue(of(mockCategories));

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [ListTransactionComponent, NoopAnimationsModule],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter transactions by selected month', () => {
    component.onMonthChange({ target: { value: '1' } }); // Simulate changing month to February (index 1)
    expect(component.filteredTransactions.length).toBe(1); // Expecting 1 transaction in February
  });

  it('should delete transaction', () => {
    const transactionToDelete = mockTransactions[0];
    component.onDelete(transactionToDelete);
    expect(mockTransactionService.deleteTransaction).toHaveBeenCalledWith(transactionToDelete);
  });

  it('should get category name', () => {
    const categoryName = component.getCategoryName('1');
    expect(categoryName).toBe('Food'); // Expecting category name 'Food' for categoryId '1'
  });

});
