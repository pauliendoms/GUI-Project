import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const emailsInUse = ["real@mail.com"]

  class MockRouter {
    navigate(commands: any[]): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        resolve(true);
      })
    } 
  };

  class MockAuthService {
    getSigninMethods(email: string): Promise<string[]> {
      return new Promise<string[]>((resolve) => {
        if(email in emailsInUse) {
          resolve(["1", "2"]);
        } else {
          resolve([]);
        }
      })
    }
    signup(email: string, pass: string): Promise<string> {
      return new Promise<string>((resolve) => {
        if(true){
          resolve('succes');
        } else {
          resolve('error')
        }
      })
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: Router, useClass: MockRouter}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // negative test to see if email is invalid with invalid input
  it('email should be invalid after invalid input', fakeAsync(async() => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('notreal');
    component.form.updateValueAndValidity();
    tick()
    await fixture.whenStable().then(() => {
      expect(component.form.get('email')?.valid).toBeFalsy();
    })
  }));
  
  // positive test to see if email is valid if it's a valid email address and it isn't used yet
  it('email should be valid after valid input', fakeAsync(async() => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('echte@mail.com');
    component.form.updateValueAndValidity();
    tick()
    await fixture.whenStable().then(() => {
      expect(component.form.get('email')?.valid).toBeTruthy();
    })
  }))

  // negative test to see if email is invalid when it's a valid email address but it is already in use
  it('email should be invalid if already in use', fakeAsync(async() => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('real@mail.com');
    component.form.updateValueAndValidity();
    
    await fixture.whenStable().then(() => {
      expect(component.form.get('email')?.valid).toBeFalsy();
    })
  }))

  // negative test to see if it's invalid if we don't do it asynchronously
  it('signup should not resolve if we do it asynch', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('een@mail.com');
    component.form.get('password')?.setValue('pass');
    component.form.get('rpassword')?.setValue('pass');
    component.form.updateValueAndValidity();

    component.onSignup();

    fixture.detectChanges();
    expect(component.invalidLogin).toBeTruthy();

  })

  // the previous one means that it should be valid if we do it asynch
  it('signup should resolve if asynch, verifying by making extra variable', fakeAsync(async() => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('een@mail.com');
    component.form.get('password')?.setValue('pass');
    component.form.get('rpassword')?.setValue('pass');
    component.form.updateValueAndValidity();

    component.onSignup();

    await fixture.whenStable().then(() => {
      expect(component.invalidLogin).toBeFalsy();
    })
  }))

  // I made a variabele invalidLogin that is set to false when we are able to login but we can also check if the router.navigate function is called
  it('signup should resolve if asynch, verifying by spying on router', fakeAsync(async() => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('een@mail.com');
    component.form.get('password')?.setValue('pass');
    component.form.get('rpassword')?.setValue('pass');
    component.form.updateValueAndValidity();

    component.onSignup();
    const spy = spyOn(component['router'], 'navigate');

    await fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledWith(['login'])
    })
  }))

});