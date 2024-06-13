import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firebaseService: FirebaseService) {}

  getTransactions(huishoudboekjeId: string): Observable<Transaction[]> {
    return new Observable((subscriber: Subscriber<Transaction[]>) => {
      onSnapshot(collection(this.firebaseService.firestore, 'Transactions'), (snapshot) => {
        let transactions: Transaction[] = [];
        snapshot.forEach((doc) => {
          let transaction = doc.data() as Transaction;
          transaction.id = doc.id;
          if (transaction.huishoudboekjeId === huishoudboekjeId) {
            transactions.push(transaction);
          }
        });
        subscriber.next(transactions);
      });
    });
  }

  getTransaction(id: string): Observable<Transaction> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id === "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firebaseService.firestore, "Transactions", id), (doc) => {
          let transaction = doc.data() ?? null;
          if (transaction) {
            transaction["id"] = doc.id;
          }
          subscriber.next(transaction);
        });
      }
    });
  }

  async addTransaction(transaction: Transaction) {
    const { id, ...object } = Object.assign({}, transaction);
    await addDoc(collection(this.firebaseService.firestore, 'Transactions'), object);
  }

  async deleteTransaction(transaction: Transaction) {
    await deleteDoc(doc(this.firebaseService.firestore, "Transactions", transaction.id));
  }

  async updateTransaction(transaction: Transaction) {
    const { id, ...object } = Object.assign({}, transaction);
    await updateDoc(doc(this.firebaseService.firestore, "Transactions", transaction.id), object);
  }
}
