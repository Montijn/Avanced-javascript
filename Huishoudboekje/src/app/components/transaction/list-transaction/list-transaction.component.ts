import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-list-transaction',
  standalone: true,
  imports: [MatListModule,MatCardModule, MatButtonModule, NgFor, RouterModule, NgIf, NgClass],
  templateUrl: './list-transaction.component.html',
  styleUrl: './list-transaction.component.scss'
})
export class ListTransactionComponent {
 @Input()
 transactions: Transaction[] = [];
 
 private huishoudboekjeId: string;
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router
  ) 
  {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
    transactionService
        .getTransactions(this.huishoudboekjeId)
        .subscribe((transactions) => {
            this.transactions = transactions;
        });

      console.log(this.transactions)
  }

  onDelete(transaction: Transaction){
    this.transactionService.deleteTransaction(transaction);
  }
  
}
