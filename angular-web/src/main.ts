import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  if (environment.production) {
    enableProdMode();
    const methods = ['log', 'error', 'table', 'warn', 'info'];
    methods.forEach(method => {
      console[method] = () => {};
    });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
