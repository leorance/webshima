import { Injectable } from '@angular/core';
import { constants } from '../common/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private cookieService: CookieService
  ) { }

  clearStorage() {
    this.cookieService.deleteAll();
  }

  getAccessToken() {
    return this.cookieService.get(constants.storageKey.accesTokenKey);
  }

  setAccessToken(newToken) {
    this.cookieService.set(constants.storageKey.accesTokenKey, newToken);
  }


  // used to get user logged in from the local storage
  getUserLogin() {
    return this.cookieService.get(constants.storageKey.userLoginKey);
  }

  // used to set user login key on session storage
  setUserLogin(userData) {
    this.cookieService.set(constants.storageKey.userLoginKey, userData);
  }

  // used to check if user logged in
  isUserLoggedIn() {
    return this.getUserLogin() && this.getAccessToken();
  }

  isAdmin() {
    return JSON.parse(this.getUserLogin()).is_admin === 1 ? true : false;
  }
}
