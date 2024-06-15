import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../models/transaction.model';
import { Category } from '../../../../models/category.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-category-chart',
  standalone: true,
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss'],
  imports: [NgxChartsModule],
})
export class CategoryChartComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() categories: Category[] = [];

  public barChartOptions: any = {};
  public barChartLabels: string[] = [];
  public barChartData: any[] = [];
  public view: [number, number] = [700, 400];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Categories';
  public showYAxisLabel = true;
  public yAxisLabel = 'Amount';
  public legendTitle = 'Legend';


  constructor() { }

  ngOnInit(): void {
    this.setupChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] || changes['categories']) {
      this.setupChart();
    }
  }

  setupChart(): void {
    const categoryData: any[] = [];

    this.categories.forEach(category => {
      categoryData.push({
        name: category.name,
        value: 0
      });
    });

    this.transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const category = categoryData.find(cat => cat.name === this.getCategoryName(transaction.categoryId));
        if (category) {
          category.value += transaction.amount;
        }
      }
    });

    this.barChartData = categoryData;
  }

  getCategoryName(categoryId: string | undefined): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'No Category';
  }
}
