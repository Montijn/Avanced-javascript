import { Component, Input } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { NgFor, NgIf, NgClass, CommonModule, DatePipe } from '@angular/common';
import { Timestamp } from 'firebase/firestore';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { monthOptions } from '../month-options';
import { MonthlyChartComponent } from "../charts/monthly-chart/monthly-chart.component";
import { CategoryChartComponent } from "../charts/category-chart/category-chart.component";

@Component({
    selector: 'app-list-transaction',
    standalone: true,
    providers: [DatePipe],
    templateUrl: './list-transaction.component.html',
    styleUrls: ['./list-transaction.component.scss'],
    imports: [NgFor, RouterModule, NgIf, NgClass, CommonModule, MonthlyChartComponent, CategoryChartComponent]
})
export class ListTransactionComponent {
  @Input() transactions: Transaction[] = [];
  public filteredTransactions: Transaction[] = [];
  public categories: Category[] = [];
  public huishoudboekjeId: string;
  public selectedMonth: number;
  public months = monthOptions;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private router: Router,
    private categoryService: CategoryService,
  ) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth();

    this.transactionService.getTransactions(this.huishoudboekjeId)
    .subscribe(transactions => {
      this.transactions = transactions;
      this.filterTransactions();
    });

    this.categoryService.getCategories(this.huishoudboekjeId)
    .subscribe(categories => {
      this.categories = categories;
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

  getCategoryName(categoryId: string | undefined): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  }
}
