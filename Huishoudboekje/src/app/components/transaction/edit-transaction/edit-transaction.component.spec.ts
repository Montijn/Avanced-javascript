import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTransactionComponent } from './edit-transaction.component';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { of } from 'rxjs';

describe('EditTransactionComponent', () => {
  let component: EditTransactionComponent;
  let fixture: ComponentFixture<EditTransactionComponent>;
  let mockTransactionService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  const mockTransaction: any = {
    id: '1',
    huishoudboekjeId: '1',
    amount: 50,
    type: 'expense',
    date: Timestamp.fromMillis(Date.now()),
  };

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['getTransaction', 'updateTransaction']);
    mockTransactionService.getTransaction.and.returnValue(of(mockTransaction));
    mockTransactionService.updateTransaction.and.returnValue(Promise.resolve());

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1'
        }
      }
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateTransaction on save', () => {
    const newDate = new Date();
    component.transactionDate = newDate;

    component.onSave();

    expect(mockTransactionService.updateTransaction).toHaveBeenCalledWith({
      ...mockTransaction,
      date: Timestamp.fromDate(newDate)
    });

  });
});
