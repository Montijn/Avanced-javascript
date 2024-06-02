import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Participant } from '../../models/participant.model';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot } from '@firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private firebaseService: FirebaseService) {}

  getParticipants(householdBookId: string): Observable<Participant[]> {
    return new Observable((subscriber: Subscriber<Participant[]>) => {
      onSnapshot(collection(this.firebaseService.firestore, 'Participants'), (snapshot) => {
        let participants: Participant[] = [];
        snapshot.forEach((doc) => {
          let participant = doc.data() as Participant;
          participant.id = doc.id;
          if (participant.householdBookId === householdBookId) {
            participants.push(participant);
          }
        });
        subscriber.next(participants);
      });
    });
  }


  getParticipant(id: string): Observable<Participant | undefined> {
    return new Observable((subscriber: Subscriber<any>) => {
      if (id == "") {
        subscriber.next(null);
      } else {
        onSnapshot(doc(this.firebaseService.firestore, "Participant", id), (doc) => {
          let participant = doc.data() ?? null;
          if (participant) {
            participant['id'] = doc.id;
          }
          subscriber.next(participant);
        });
      }
    })
  }

  addParticipant(participant: Participant) {
    const { id, ...object } = Object.assign({}, participant);
    addDoc(collection(this.firebaseService.firestore, 'Participants'), object);
  }

  deleteParticipant(participant: Participant) {
    deleteDoc(doc(this.firebaseService.firestore, "Participants", participant.id));
  }

  updateCategory(participant: Participant) {
    const { id, ...object } = Object.assign({}, participant);
    updateDoc(doc(this.firebaseService.firestore, "Participants", participant.id), object);
  }
}
