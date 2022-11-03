import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedin: boolean = false;
  routerSubscription: Subscription = new Subscription;

  constructor(private auth: AuthService, private router: Router) { }

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
