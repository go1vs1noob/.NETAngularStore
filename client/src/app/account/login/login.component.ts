import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  returnUrl: string;
  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/shop';
  }
  ngOnInit() {

  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe(
      {
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        }
      }
    );
  }
  get email() {
    return this.loginForm.controls.email as FormControl;
  }
  get password() {
    return this.loginForm.controls.password as FormControl;
  }
}
