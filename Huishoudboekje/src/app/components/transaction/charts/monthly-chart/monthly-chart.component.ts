import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../models/transaction.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.scss'],
  imports: [NgxChartsModule],
})
export class MonthlyChartComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() selectedMonth: number;

  public multi: any[] = [];
  public view: [number, number] = [700, 400];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Month';
  public showYAxisLabel = true;
  public yAxisLabel = 'Amount';
  public legendTitle = 'Legend';

  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };

  constructor() { }

  ngOnInit(): void {
    this.setupChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] || changes['selectedMonth']) {
      this.setupChart();
    }
  }

  setupChart(): void {
    const expensesData: any[] = [];
    const incomesData: any[] = [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    months.forEach((month, index) => {
      expensesData.push({
        name: month,
        value: 0
      });

      incomesData.push({
        name: month,
        value: 0
      });
    });

    this.transactions.forEach(transaction => {
      const month = transaction.date.toDate().getMonth();
      if (transaction.type === 'expense') {
        expensesData[month].value += transaction.amount;
      } else if (transaction.type === 'income') {
        incomesData[month].value += transaction.amount;
      }
    });

    this.multi = [
      {
        name: 'Expenses',
        series: expensesData
      },
      {
        name: 'Incomes',
        series: incomesData
      }
    ];
  }
}
