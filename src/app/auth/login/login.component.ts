import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.invalidLogin = false;
  }

  onLogin(): void {
    const email = this.form.value.email;
    const pass = this.form.value.password;

    this.authService.login(email, pass)
    .then((response: boolean | undefined) => {
      if(!response) {
        this.invalidLogin = true;
      } else {
        this.invalidLogin = false;
        this.router.navigate(['cards']);
      }

    })
  }

}
