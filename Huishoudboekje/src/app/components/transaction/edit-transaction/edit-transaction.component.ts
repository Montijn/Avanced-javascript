import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [NgIf, FormsModule, MatDatepickerModule, MatNativeDateModule  ],
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent {
  transactionId: string = '';
  currentUserId: string = '';
  transaction: Transaction;
  transactionDate: Date;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService, private router: Router) {
    this.transactionId = this.route.snapshot.paramMap.get('transactionId') ?? '';

    this.transactionService.getTransaction(this.transactionId).subscribe((transaction: Transaction) => {
      if (transaction) {
        this.transaction = transaction;
        if (this.transaction.date instanceof Timestamp) {
          this.transactionDate = this.transaction.date.toDate();
        } else {
          this.transactionDate = new Date(this.transaction.date);
        }
      }
    });
  }

  onSave(): void {
    this.transaction.date = Timestamp.fromDate(this.transactionDate);
    this.transactionService.updateTransaction(this.transaction).then(() => {
      this.router.navigate(['/overview']);
    });
  }
}
