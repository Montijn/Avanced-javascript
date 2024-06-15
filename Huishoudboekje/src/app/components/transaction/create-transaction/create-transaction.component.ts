import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { CategoryService } from '../../../services/category/category.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  private huishoudboekjeId: string;
  categories: Category[] = [];

  transaction: Transaction = {
    id: '',
    huishoudboekjeId: '',
    amount: 0,
    type: 'expense',
    date: Timestamp.now(),
    description: '',
    categoryId: ''
  };

  constructor(
    private transactionService: TransactionService, 
    private categoryService: CategoryService, 
    private route: ActivatedRoute
  ) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
  }

  ngOnInit() {
    this.categoryService.getCategories(this.huishoudboekjeId).subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onAdd() {
    if (this.transaction.amount > 0) {
      this.transaction.huishoudboekjeId = this.huishoudboekjeId;
      this.transaction.date = Timestamp.now();
      this.transactionService.addTransaction(this.transaction);
      this.resetForm();
    }
  }

  private resetForm() {
    this.transaction = {
      id: '',
      huishoudboekjeId: '',
      amount: 0,
      type: 'expense',
      date: Timestamp.now(),
      description: '',
      categoryId: ''
    };
  }
}
