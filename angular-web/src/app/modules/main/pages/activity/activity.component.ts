import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  selectedTabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeTabIndex(index) {
    this.selectedTabIndex = index;
  }

}
