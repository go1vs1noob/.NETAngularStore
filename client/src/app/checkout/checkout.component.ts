import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
  constructor(private readonly accountService: AccountService) {

  }
  checkoutForm: FormGroup = new FormGroup({
    addressForm: new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zipCode: new FormControl("", [Validators.required])
    }),
    deliveryForm: new FormGroup({
      deliveryMethod: new FormControl("", [Validators.required]),
    }),
    paymentForm: new FormGroup({
      nameOnCard: new FormControl('', [Validators.required])
    }),
  });
  ngOnInit() {
    this.getAddressFromFormValues();
  }
  getAddressFromFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    })
  }
}
