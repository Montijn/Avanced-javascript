import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Transaction } from '../../../models/transaction.model';


@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.scss'
})
export class EditTransactionComponent {
 transactionId: string = '';
 currentUserId: string = "";
 transaction: Transaction;
 constructor(private route: ActivatedRoute, private authService: AuthService, private transactionService: TransactionService, private router: Router,){
  this.transactionId = this.route.snapshot.paramMap.get('trasactionId') ?? '';

  this.authService.$currentUser.subscribe(user => {
    if (user) {
      this.currentUserId = user.uid;
    }
  });
  this.transactionService.getTransaction(this.transactionId).subscribe((transaction: Transaction) => {
    if (transaction) {
      this.transaction = transaction;
    }
  });
 }

 onSave(): void {
  this.transactionService.updateTransaction(this.transaction).then(() => {
    this.router.navigate(['/overview']);
  });
}

}
