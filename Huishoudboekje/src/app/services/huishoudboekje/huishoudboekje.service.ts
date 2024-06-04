import { Injectable } from '@angular/core';
import { Observable, Subscriber, of } from 'rxjs';
import {Huishoudboekje} from '../../models/huishoudboekje.model'
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
@Injectable({
  providedIn: 'root'
})

export class HuishoudboekjeService {

  constructor(private firebaseService: FirebaseService) {}

  getHuishoudboekjes(): Observable<Huishoudboekje[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      onSnapshot(collection(this.firebaseService.firestore, 'Huishoudboekje'), (snapshot) => {
        let huishoudboekjes: any[] = [];
        snapshot.forEach((doc) => {
          let huishoudboekje = doc.data();
          huishoudboekje['id'] = doc.id;
          huishoudboekjes.push(huishoudboekje);
        });
        subscriber.next(huishoudboekjes);
      });
    });
  }

  getHuishoudboekje(id: string): Observable<Huishoudboekje | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firebaseService.firestore, "Huishoudboekje", id), (doc) => {
          let huishoudboekje = doc.data() ?? null;
          if (huishoudboekje) {
            huishoudboekje['id'] = doc.id;
          }
          subscriber.next(huishoudboekje);
        });
      }
    })
  }

  async addHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const { id, ...object } = Object.assign({}, huishoudboekje);
    await addDoc(collection(this.firebaseService.firestore, 'Huishoudboekje'), object);
  }

 async deleteHuishoudboekje(huishoudboekje: Huishoudboekje) {
    await deleteDoc(doc(this.firebaseService.firestore, "Huishoudboekje", huishoudboekje.id));
  }

  async updateHuishoudboekje(huishoudboekje: Huishoudboekje) {
    const { id, ...object } = Object.assign({}, huishoudboekje);
    await updateDoc(doc(this.firebaseService.firestore, "Huishoudboekje", huishoudboekje.id), object);
  }

  
}
