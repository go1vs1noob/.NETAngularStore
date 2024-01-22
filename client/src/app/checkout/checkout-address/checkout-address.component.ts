import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.sass']
})
export class CheckoutAddressComponent {
  saveUserAddress() {
    this.accountService.updateUserAddress(this.addressForm?.value).subscribe({
      next: () => {
        console.log("Address saved");
        this.addressForm.reset(this.addressForm?.value);
      }
    });
  }
  @Input() checkoutForm?: FormGroup;

  constructor(private accountService: AccountService) { }

  get firstName() {
    return this.addressForm?.controls.firstName as FormControl;
  }
  get lastName() {
    return this.addressForm?.controls.lastName as FormControl;
  }
  get street() {
    return this.addressForm?.controls.street as FormControl;
  }
  get city() {
    return this.addressForm?.controls.city as FormControl;
  }
  get state() {
    return this.addressForm?.controls.state as FormControl;
  }
  get zipCode() {
    return this.addressForm?.controls.zipCode as FormControl;
  }
  get addressForm() {
    return this.checkoutForm?.get('addressForm') as FormGroup;
  }

}
