// firebase-test.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase/firebase.service';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-firebase-test',
  templateUrl: './firebase-test.component.html',
  styleUrls: ['./firebase-test.component.scss'],
  standalone: true
})
export class FirebaseTestComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit(): Promise<void> {
    // Test Firestore connection by writing and reading a document
    try {
      const testDocRef = doc(this.firebaseService.firestore, 'Huishoudboekje', 'Huishoudboekje');
      
      // Write a test document
      await setDoc(testDocRef, { name: 'testValue' });
      console.log('Document written successfully');

      const unsub = onSnapshot(doc(this.firebaseService.firestore, "Huishoudboekje", "5OFEDFbjzpONPf4JHlXr"), (doc) => {console.log(doc.data())});
      
    } catch (error) {
      console.error('Error connecting to Firestore:', error);
    }
  }
}
