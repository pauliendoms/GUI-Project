import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('f') form!: NgForm;

  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignup() {
    const email = this.form.value.email;
    const pass = this.form.value.password;

    console.log(email);
    console.log(pass);

    this.authService.signup(email, pass)
    .then((res: string) => {
      if(res == 'succes') {
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    })
  }

}
