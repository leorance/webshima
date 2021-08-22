import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private translationService: TranslateService
  ) { }

  ngOnInit() {
    // set tab title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => {
      let title = event['title'];
      this.translationService.get(title).toPromise()
        .then(titleTr => title = titleTr)
        .finally(() => {
          this.titleService.setTitle(title);
        });
    });
  }
}
