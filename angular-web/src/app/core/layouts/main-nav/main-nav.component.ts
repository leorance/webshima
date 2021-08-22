import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  isHandset = false;
  onSubmittingForm = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map((result) => {
      if (result.matches) {
        this.isHandset = true;
      } else {
        this.isHandset = false;
      }
      return result.matches;
    })
  );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  // close navbar when clicking on nav menu
  clickNav(drawer) {
    this.isHandset$.subscribe(res => {
      if (res === true) {
        drawer.close();
      }
    });
  }

  isUserLoggedIn() {
    if (this.storageService.isUserLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  // function to when click logout
  async logout() {
    this.onSubmittingForm = true;
    try {
      const response = await this.userService.logout().toPromise();
      if (response && response.status && response.status === 200) {
        this.storageService.clearStorage();
        alert('Logout Success! See you again later! :)');
        this.router.navigate(['/']);
      } else {
        alert('Logout Failed. Try again later.');
      }
    } catch (error) {
      if (error && error.error && error.error.data) {
        alert('Logout Failed. ' + error.error.data);
      } else {
        alert('Logout failed. Try again later.');
      }
    } finally {
      this.onSubmittingForm = false;
    }
  }
}
