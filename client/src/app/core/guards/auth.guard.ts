import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  // route guards automatically subscribe and unsubscribe, so we don't need to
  return accountService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true;
      }
      else {
        // this way user will be returned to a requested page after authentication
        router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } })
        return false;
      }
    })
  );


};
