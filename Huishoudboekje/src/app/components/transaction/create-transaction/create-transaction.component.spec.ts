import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateTransactionComponent } from './create-transaction.component';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let mockTransactionService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTransactionService = {
      addTransaction: jasmine.createSpy('addTransaction')
    };
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
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTransaction method of TransactionService when onAdd is called', () => {

    const transaction = {
      id: '', 
      huishoudboekjeId: '1', 
      categoryId: '1', 
      amount: 50,
      type: 'expense',
      description: '', 
      date: jasmine.any(Object) 
    };


    component.transaction.categoryId = '1'; 
    component.transaction.amount = transaction.amount;
    component.transaction.type = 'expense';


    component.onAdd();

    expect(mockTransactionService.addTransaction).toHaveBeenCalledWith(jasmine.objectContaining({
      huishoudboekjeId: '1', 
      categoryId: '1', 
      amount: 50,
      type: 'expense',
      description: '' 
   
    }));
  });

});
