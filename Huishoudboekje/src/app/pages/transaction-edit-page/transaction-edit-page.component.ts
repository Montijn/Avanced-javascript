import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar/navbar.component";
import { EditTransactionComponent } from "../../components/transaction/edit-transaction/edit-transaction.component";

@Component({
    selector: 'app-transaction-edit-page',
    standalone: true,
    templateUrl: './transaction-edit-page.component.html',
    styleUrl: './transaction-edit-page.component.scss',
    imports: [NavbarComponent, EditTransactionComponent]
})
export class TransactionEditPageComponent {

}
