import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  complexPasswordExpression = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";
  registerForm: FormGroup = new FormGroup({
    displayName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern(this.complexPasswordExpression)])
  });
  constructor(private accountService: AccountService, private router: Router) { }
  get email() {
    return this.registerForm.controls.email as FormControl;
  }
  get password() {
    return this.registerForm.controls.password as FormControl;
  }
  get displayName() {
    return this.registerForm.controls.displayName as FormControl;
  }
  onSubmit() {
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(
      {
        next: () => {
          this.router.navigateByUrl('/shop');
        }
      }
    );
  }
}
