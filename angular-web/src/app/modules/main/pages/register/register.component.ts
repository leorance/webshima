import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { constants } from 'src/app/shared/common/constants';
import { UserService } from 'src/app/shared/services/user.service';
import { PreRegistered } from './models/pre-register';
import { RegisterRequest } from './models/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSameNumber: boolean;
  preRegisterData: PreRegistered;

  constants = constants;
  onSubmitingForm = false;
  onPreRegister = false;
  isValid = false;

  constructor(
    private userService: UserService,
  ) { }

  get phone() {
    return this.registerForm.get('phone');
  }

  get phone_wa() {
    return this.registerForm.get('phone_wa');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get nim() {
    return this.registerForm.get('nim');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get c_password() {
    return this.registerForm.get('c_password');
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nim: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      phone_wa: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      c_password: new FormControl('', Validators.required)
    }, {
      validators: this.matchPassword
    });
  }

  whatsappCopied(e) {
    if (this.isSameNumber) {
      this.registerForm.patchValue({
        phone_wa: e.target.value,
      });
    }
  }

  sameNumber(e) {
    if (e.checked) {
      this.isSameNumber = true;
      this.registerForm.patchValue({
        phone_wa: this.registerForm.value.phone,
      });
    } else {
      this.isSameNumber = false;
      this.registerForm.patchValue({
        phone_wa: '',
      });
    }
  }

  async preRegistered()  {
    this.onPreRegister = true;
    try {
      const preRegisterRequest = {
        nim: this.nim.value
      };
      const response = await this.userService.preRegistered(preRegisterRequest).toPromise();
      if (response && response.status && response.status === 200) {
        this.preRegisterData = response;
        this.isValid = true;
        alert('Data anda valid. Silahkan lanjutkan proses.');
      } else {
        alert('Register failed. Try again later.');
      }
    } catch (error) {
      this.isValid = false;
      if (error && error.error && error.error.data) {
        alert('Register Failed. ' + error.error.data);
      } else {
        alert('Register failed. Try again later.');
      }
    } finally {
      this.onPreRegister = false;
    }
  }

  async register() {
    this.onSubmitingForm = true;
    try {
      const vFormValue: RegisterRequest = {
        nim: this.preRegisterData.data.nim,
        name: this.preRegisterData.data.name,
        email: this.email.value,
        password: this.password.value,
        c_password: this.password.value,
        address: this.address.value,
        phone: this.phone.value,
        phone_wa: this.phone_wa.value
      };
      const response = await this.userService.register(vFormValue).toPromise();
      if (response && response.status && response.status === 200) {
        alert('Register Success. Now, you can login :)');
        this.registerForm.reset();
      } else {
        alert('Register failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Register Failed. ' + error.error.data);
      } else {
        alert('Register failed. Try again later.');
      }
    } finally {
      this.onSubmitingForm = false;
    }
  }

  matchPassword: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const password = formGroup.get('password');
    const c_password = formGroup.get('c_password');
    if (password && c_password && password.value !== c_password.value) {
      c_password.setErrors({ matchPassword: true });
      return { 'matchPassword': true };
    } else {
      return null;
    }
  }
}
