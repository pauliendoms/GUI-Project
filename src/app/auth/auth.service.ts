import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Admin, DatabaseService } from '../database.service';
import { browserLocalPersistence } from '@firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  //admin: boolean = false;
  uid: BehaviorSubject<string> = new BehaviorSubject<string>("");
  admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth, private router: Router, private data: DatabaseService) { 
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }

    auth.setPersistence(browserLocalPersistence)

    onAuthStateChanged(auth, user => {
      if (user) {
        this.uid.next(user.uid);
        this.checkAdmin();
        console.log("checked admin: ", this.admin.getValue());
      } else {
        console.log("user is not logged in");
      }
    })

  }

  signup(email: string, password: string) : Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .catch(error => {
      console.log(error);
      return error;
    })
    .then(() => {
      return 'succes';
    });
  }

  login(email: string, password: string): Promise<boolean|undefined> {
    return signInWithEmailAndPassword(this.auth, email, password)
    .then(() => {
      return this.auth.currentUser?.getIdToken()
      .then( (token: string) => {
        this.token = token;
        localStorage.setItem('token', token);
        return true;
      })
    })
    .catch(
      error => {
        console.log(error);
        return false;
      }
    )
  }

  logout(): void {
    this.auth.signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }

  getId(): string | undefined { 
    return this.auth.currentUser?.uid
  }

  checkAdmin(): void {
    this.uid.subscribe({
      next: (uid: string) => {
        this.data.getAdmin(uid).subscribe({
          next: (response: Admin) => {
            if(response){
              //this.admin = true;
              this.admin.next(true);
            } else {
              //this.admin = false;
              this.admin.next(false);
            }
          }
        })
      }
    })
  }
/*
  isAdmin(): boolean {
    return this.admin;
  }
*/
}
