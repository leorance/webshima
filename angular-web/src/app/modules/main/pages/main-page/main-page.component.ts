import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  isUserLoggedIn() {
    if (this.storageService.isUserLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

}
