import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let returnUrl = state.url
  return true;
};
