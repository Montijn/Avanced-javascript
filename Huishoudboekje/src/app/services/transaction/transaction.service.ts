import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firebaseService: FirebaseService) {}

  getTransactions(householdBookId: string): Observable<Transaction[]> {
    return new Observable((subscriber: Subscriber<Transaction[]>) => {
      onSnapshot(collection(this.firebaseService.firestore, 'Transactions'), (snapshot) => {
        let transactions: Transaction[] = [];
        snapshot.forEach((doc) => {
          let transaction = doc.data() as Transaction;
          transaction.id = doc.id;
          if (transaction.householdBookId === householdBookId) {
            transactions.push(transaction);
          }
        });
        subscriber.next(transactions);
      });
    });
  }

  getTransaction(id: string): Observable<Transaction | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firebaseService.firestore, "Transactions", id), (doc) => {
          let transaction = doc.data() ?? null;
          if (transaction) {
            transaction['id'] = doc.id;
          }
          subscriber.next(transaction);
        });
      }
    });
  }

  addTransaction(transaction: Transaction) {
    const { id, ...object } = Object.assign({}, transaction);
    addDoc(collection(this.firebaseService.firestore, 'Transactions'), object);
  }

  deleteTransaction(transaction: Transaction) {
    deleteDoc(doc(this.firebaseService.firestore, "Transactions", transaction.id));
  }

  updateTransaction(transaction: Transaction) {
    const { id, ...object } = Object.assign({}, transaction);
    updateDoc(doc(this.firebaseService.firestore, "Transactions", transaction.id), object);
  }
}