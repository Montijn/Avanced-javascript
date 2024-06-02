import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import { CollectionReference, collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { User } from '../../models/user.model';
import { User as FirebaseUser } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly collection: CollectionReference<User>
  constructor(private firebaseService: FirebaseService) { 
    this.collection = collection(this.firebaseService.firestore, 'users') as CollectionReference<User>;
  }

  async updateUser(user: FirebaseUser | null) {
    if (user == null) return;
    const userModel = {
      email: user.email,
      name: user.displayName,
    }
    console.log(userModel);
    // await setDoc(doc(this.collection, user.uid), userModel as User);
  }

  async getUser(userId: any) {
    let docRef = doc(this.collection, userId);
    return new Observable((subscriber) => {
      const eventsSnapshot = onSnapshot(docRef, (snapshot) => {
        subscriber.next({...snapshot.data(), id: snapshot.id});
      });
    });
  }
}
