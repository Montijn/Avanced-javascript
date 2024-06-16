import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { ListTransactionComponent } from '../../components/transaction/list-transaction/list-transaction.component';
import { DetailsHuishoudboekjeComponent } from "../../components/huishoudboekje/details-huishoudboekje/details-huishoudboekje.component";
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { CreateTransactionComponent } from "../../components/transaction/create-transaction/create-transaction.component";
@Component({
    selector: 'app-transaction-overview-page',
    standalone: true,
    templateUrl: './transaction-overview-page.component.html',
    styleUrl: './transaction-overview-page.component.scss',
    imports: [NavbarComponent, ListTransactionComponent, DetailsHuishoudboekjeComponent, CreateTransactionComponent]
})
export class TransactionOverviewPageComponent {
  transactions: Transaction []
  huishoudboekjeId: string
  constructor(transactionService: TransactionService, route: ActivatedRoute ){
    this.huishoudboekjeId = route.snapshot.paramMap.get('id') ?? '';
    transactionService.getTransactions(this.huishoudboekjeId).subscribe((transactions: Transaction[]) => {
      if(transactions){
        this.transactions = transactions
      }
    })
  }

}
