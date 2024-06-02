import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Category } from '../../models/category.model';
import { collection, addDoc, deleteDoc, doc, Firestore, onSnapshot, updateDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firebaseService: FirebaseService) {}

  getCategories(householdBookId: string): Observable<Category[]> {
    return new Observable((subscriber: Subscriber<Category[]>) => {
      onSnapshot(collection(this.firebaseService.firestore, 'Categories'), (snapshot) => {
        let categories: Category[] = [];
        snapshot.forEach((doc) => {
          let category = doc.data() as Category;
          category.id = doc.id;
          if (category.householdBookId === householdBookId) {
            categories.push(category);
          }
        });
        subscriber.next(categories);
      });
    });
  }

  getCategory(id: string): Observable<Category | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firebaseService.firestore, "Categories", id), (doc) => {
          let category = doc.data() ?? null;
          if (category) {
            category['id'] = doc.id;
          }
          subscriber.next(category);
        });
      }
    })
  }

  addCategory(category: Category) {
    const { id, ...object } = Object.assign({}, category);
    addDoc(collection(this.firebaseService.firestore, 'Categories'), object);
  }

  deleteCategory(category: Category) {
    deleteDoc(doc(this.firebaseService.firestore, "Categories", category.id));
  }

  updateCategory(category: Category) {
    const { id, ...object } = Object.assign({}, category);
    updateDoc(doc(this.firebaseService.firestore, "Categories", category.id), object);
  }
}
