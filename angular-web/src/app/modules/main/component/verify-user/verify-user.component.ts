import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { VerifyRequest } from '../../models/verify-request';
import { constants } from 'src/app/shared/common/constants';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  mySubscription: any;

  isSendCode = false;
  onSubmitingForm = false;

  constants = constants;

  get verificationCode() {
    return this.verificationForm.get('verificationCode');
  }

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verificationForm = new FormGroup({
      verificationCode: new FormControl('', Validators.required)
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  getUserData(): User {
    try {
      return JSON.parse(this.storageService.getUserLogin());
    } catch (error) {
      return null;
    }
  }

  async onClickSendCode() {
    this.isSendCode = true;
    try {
      const response = await this.userService.sendEmailCode().toPromise();
      if (response && response.status && response.status === 200) {
        if (response.data) {
          alert('Send Code Success! ' + response.data);
        } else {
          alert('Send Code Success! Please check your e-mail.');
        }
      } else {
        alert('Send Code Failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Send Code Failed. ' + error.error.data);
      } else {
        alert('Send Code Failed. Try again later.');
      }
    } finally {
      this.isSendCode = false;
    }
  }

  async onClickVerify() {
    this.onSubmitingForm = true;
    try {
      const verifyRequest: VerifyRequest = {
        otp: this.verificationCode.value
      };
      const response = await this.userService.verifyCode(verifyRequest).toPromise();
      if (response && response.status && response.status === 200) {
        if (response.user) {
          this.storageService.setUserLogin(JSON.stringify(response.user));

          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.mySubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              this.router.navigated = false;
            }
          });
        }
        if (response.data) {
          alert('Verify Account Success! ' + response.data);
        } else {
          alert('Verify Account Success! Now you are verified.');
        }
      } else {
        alert('Verify Account Failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Verify Account Failed. ' + error.error.data);
      } else {
        alert('Verify Account Failed. Try again later.');
      }
    } finally {
      this.onSubmitingForm = false;
    }
  }
}
