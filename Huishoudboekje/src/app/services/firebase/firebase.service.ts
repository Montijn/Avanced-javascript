import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth, Auth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firestore: Firestore
  public auth: Auth
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyAKPFnw07Wu0totsELWDxxoU0C6Q4xN6mc",
      authDomain: "huishoudboekje-3a1ac.firebaseapp.com",
      projectId: "huishoudboekje-3a1ac",
      storageBucket: "huishoudboekje-3a1ac.appspot.com",
      messagingSenderId: "854024300251",
      appId: "1:854024300251:web:d32508005156d606b1cefe",
      measurementId: "G-V3TSQQWKTN"
    };

    const app = initializeApp(firebaseConfig);
    
    this.firestore = getFirestore(app);
    this.auth = getAuth(app);
   } 
}