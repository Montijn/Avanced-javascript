import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { CollectionReference, collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { Auth, User as FirebaseUser } from 'firebase/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $users: Observable<any> = of([]);
  public auth: Auth;
  private usersRef: CollectionReference<any>;


  constructor(private firebaseService: FirebaseService) { 
    this.usersRef = collection(this.firebaseService.firestore, 'users');
    this.auth = this.firebaseService.auth
    this.$users = new Observable((subscriber) => {
      const usersSnapshot = onSnapshot(this.usersRef, (snapshot) => {
        const users = snapshot.docs.map(doc=> {
          const data = doc.data();
          return { ...data, uid: doc.id}
        })
        subscriber.next(users);
      });
    });
  }

  addUser(user: any) {
    const usersCol = collection(this.firebaseService.firestore, 'users');
    setDoc(doc(usersCol, user.uid), user) 
      .then(() => {
        console.log('User added successfully');
      })
      .catch((error) => {
        console.error('Error adding User: ', error);
      });
  }

  getUser(id: any) {
    let docRef = doc(this.firebaseService.firestore, 'users', id);
    return new Observable((subscriber) => {
      let unsubscribe = onSnapshot(docRef, (snapshot) => {
        subscriber.next({...snapshot.data(), id: snapshot.id});
      })
      return unsubscribe;
    })
  }

}
