import { Injectable } from '@angular/core';
import { 
  Auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth: Auth;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ){
    this.auth = firebaseService.auth;
   }

   get currentUser() {
    return this.auth.currentUser;
   }

   doRegister(value: any) {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(
        this.auth,
        value.email,
        value.password
      ).then(
        (res) => {
          this.userService.updateUser(res.user);
          resolve(res);
        },
        (err) => reject(err)
      );
    });
   }

   doLogin(value: any) {
      return new Promise<any>((resolve, reject) => {
        signInWithEmailAndPassword(
          this.auth,
           value.email,
            value.password
            ).then(
              (res) => {
                resolve(res)
              },
              (err) => reject(err)
            )
      })
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
}
