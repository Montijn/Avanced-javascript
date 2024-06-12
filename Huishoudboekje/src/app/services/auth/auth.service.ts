import { Injectable } from '@angular/core';
import { 
  Auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase/firebase.service';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth: Auth;
  public $currentUser: Observable<User>;

  constructor(private firebaseService: FirebaseService) {
    this.auth = this.firebaseService.auth;
    this.$currentUser = new Observable<User>((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          subscriber.next(user);
        }
      });
    });
    console.log(this.$currentUser);
  }

  doRegister(value: any) {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(
        this.auth,
        value.email,
        value.password
      ).then(
        (res) => {
          const usersCol = collection(this.firebaseService.firestore, 'users');
          setDoc(doc(usersCol, res.user.uid), value);
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  doLogin(value: any) {
    return new Promise<any>((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, value.email, value.password).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
        console.log(this.auth.currentUser)
        signOut(this.auth)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
    });
  }

  isLoggedIn() {
    if(this.auth.currentUser)
    {
      return true
    } else {
      return false
    }
  }
}
