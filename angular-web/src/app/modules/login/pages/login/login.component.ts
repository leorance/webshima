import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { constants } from 'src/app/shared/common/constants';
import { UserService } from 'src/app/shared/services/user.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  onSubmittingForm = false;
  constants = constants;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nim: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get nim() {
    return this.loginForm.get('nim');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    this.onSubmittingForm = true;
    try {
      const vFormValue = this.loginForm.value;
      const response = await this.userService.login(vFormValue).toPromise();
      if (response && response.status && response.status === 200 && response.data.token_access) {
        this.storageService.setAccessToken(response.data.token_access);
        this.storageService.setUserLogin(JSON.stringify(response.user));
        alert('Login Success! Welcome, ' + response.user.name + '!');
        if (response.user.is_admin === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        alert('Failed to Login. Please try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Login Failed. ' + error.error.data);
      } else {
        alert('Login failed. Try again later.');
      }
    } finally {
      this.onSubmittingForm = false;
    }
  }

}
