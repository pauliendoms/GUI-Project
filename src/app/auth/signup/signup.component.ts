import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email], [this.uniqueEmail.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'rpassword': new FormControl(null, [Validators.required, this.repeatPassword.bind(this)])
    });
  }

  onSignup() {
    const email = this.form.value.email;
    const pass = this.form.value.password;

    console.log(email);
    console.log(pass);

    this.auth.signup(email, pass)
    .then((res: string) => {
      if(res == 'succes') {
        this.router.navigate(['login']);
      } else {
        alert(res);
      }
    })
  }

  uniqueEmail(email: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((resolve, reject) => {
      if(email.hasError('email')) {
        resolve(null);
      }
      this.auth.getSigninMethods(email.value)
      .then((response: string[]) => {
        if(response.length > 0) {
          resolve({ 'emailNotUnique': true})
        }
        resolve(null)
      })
    })
  }

  repeatPassword(rpass: FormControl): {[s:string]: boolean} | null {
    console.log("hier: ", this.form.get('password')?.value)
    console.log(rpass.value)
    if(rpass.value == this.form.get('password')?.value) {
      return null
    } else {
      return {'invalidFormat': true};
    }
  }

}
