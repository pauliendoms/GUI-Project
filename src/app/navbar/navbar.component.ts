import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedin: boolean = false;
  routerSubscription: Subscription = new Subscription;
  imageUrl: string = "";

  constructor(private auth: AuthService, private router: Router, private storage: Storage) {
    const pathReference = ref(storage, 'Flashy.png');
    getDownloadURL(pathReference)
    .then((url: string) => {
      this.imageUrl = url;
    })
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe({
      next: (event) => {
        if (event.constructor.name === "NavigationEnd") {
          this.loggedin = this.auth.isLoggedIn();
        }
      }
    })
    this.loggedin = this.auth.isLoggedIn();
    console.log(this.loggedin)
  }

  onLogout(): void {
    this.auth.logout();
  }
}
