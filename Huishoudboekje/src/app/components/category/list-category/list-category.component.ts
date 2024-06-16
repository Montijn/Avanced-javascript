import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterModule, CommonModule],
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {
  @Input() categories: Category[] = [];
  transactions: Transaction[] = [];
  huishoudboekjeId: string;

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {
    this.huishoudboekjeId = this.route.snapshot.paramMap.get("id") ?? "";

  }

  ngOnInit(){
    this.transactionService.getTransactions(this.huishoudboekjeId).subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  private calculateCategoryTransactions(categoryId: string, type: 'expense' | 'income'): number {
    return this.transactions
      .filter(transaction => transaction.categoryId === categoryId && transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getCategoryAvailableBudget(categoryId: string): number {
    const totalExpenses = this.calculateCategoryTransactions(categoryId, 'expense');
    const totalIncomes = this.calculateCategoryTransactions(categoryId, 'income');
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.maxBudget + totalIncomes - totalExpenses : 0;
  }

  getSpentPercentage(categoryId: string): number {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (!category) return 0;

    const totalExpenses = this.calculateCategoryTransactions(categoryId, 'expense');
    const totalIncomes = this.calculateCategoryTransactions(categoryId, 'income');

    const availableBudget = category.maxBudget + totalIncomes - totalExpenses;
    return availableBudget > 0 ? (availableBudget / category.maxBudget) * 100 : 0;
  }

  getBudgetStatusClass(percentage: number): string {
    if (percentage > 100) {
      return 'budget-exceeded';
    } else if (percentage < 20) {
      return 'budget-warning';
    } else {
      return 'budget-ok';
    }
  }

  onDelete(category: Category) {
    this.categoryService.deleteCategory(category);
  }
}
