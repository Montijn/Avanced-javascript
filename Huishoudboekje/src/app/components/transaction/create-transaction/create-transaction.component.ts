import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    FormsModule, NgIf
  ],
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent {

  private huishoudboekjeId: string;

  transaction: Transaction = {
    id: '',
    huishoudboekjeId: '',
    amount: 0,
    type: 'expense',
    date: Timestamp.now(),
    description: ''
  };

  constructor(private transactionService: TransactionService,  private route: ActivatedRoute) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
    console.log(this.huishoudboekjeId);
  }

  onAdd() {
    if (this.transaction.amount > 0 && this.transaction.description != "") {
      this.transaction.huishoudboekjeId = this.huishoudboekjeId;
      this.transaction.date = Timestamp.now();
      this.transactionService.addTransaction(this.transaction);
    }
    this.transaction = {
      id: '',
      huishoudboekjeId: '',
      amount: 0,
      type: 'expense',
      date: Timestamp.now(),
      description: ''
    };
  }
}
