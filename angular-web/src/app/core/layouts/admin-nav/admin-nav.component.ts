import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  user;

  navList = [
    {
      title: 'Candidate',
      link: '/admin/candidate'
    },
    {
      title: 'Election',
      link: '/admin/election'
    }
  ];

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  goToMain() {
    this.router.navigate(['/']);
  }

  // function to get user data when first login
  getUserData() {
    this.user = JSON.parse(this.storageService.getUserLogin());
  }

  // close navbar when clicking on nav menu
  clickNav(drawer) {
    this.isHandset$.subscribe(res => {
      if (res === true) {
        drawer.close();
      }
    });
  }

  // function to when click logout
  async logout() {
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
    }
  }
}
