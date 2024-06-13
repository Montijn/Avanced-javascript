import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { NgFor, NgIf, NgClass, CommonModule, DatePipe } from '@angular/common';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [NgFor, RouterModule, NgIf, NgClass, CommonModule],
  providers: [DatePipe],
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.scss']
})
export class ListTransactionComponent {
  @Input() transactions: Transaction[] = [];
  public filteredTransactions: Transaction[] = [];
  public huishoudboekjeId: string;
  public selectedMonth: number;
  public months = [
    { value: 0, name: 'January' },
    { value: 1, name: 'February' },
    { value: 2, name: 'March' },
    { value: 3, name: 'April' },
    { value: 4, name: 'May' },
    { value: 5, name: 'June' },
    { value: 6, name: 'July' },
    { value: 7, name: 'August' },
    { value: 8, name: 'September' },
    { value: 9, name: 'October' },
    { value: 10, name: 'November' },
    { value: 11, name: 'December' }
  ];

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth();

    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions(this.huishoudboekjeId)
      .subscribe(transactions => {
        this.transactions = transactions;
        this.filterTransactions();
      });
  }

  filterTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = (transaction.date as Timestamp).toDate();
      return transactionDate.getMonth() === this.selectedMonth;
    }).sort((a, b) => (a.date as Timestamp).toDate().getTime() - (b.date as Timestamp).toDate().getTime());
  }

  onDelete(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction);
  }

  onMonthChange(event: any) {
    this.selectedMonth = +event.target.value;
    this.filterTransactions();
  }
}
