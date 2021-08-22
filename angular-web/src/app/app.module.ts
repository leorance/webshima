import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';

import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { MainNavComponent } from './core/layouts/main-nav/main-nav.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AdminNavComponent } from './core/layouts/admin-nav/admin-nav.component';
import { AdminLayoutComponent } from './core/layouts/admin-layout/admin-layout.component';
import { AdminGuard } from './core/guards/admin.guard';
import { LoginComponent } from './modules/login/pages/login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      title: 'Main'
    },
    children: [
      {
        path: '',
        redirectTo: 'main/intro',
        pathMatch: 'full'
      },
      {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainNavComponent,
    AdminNavComponent,
    AdminLayoutComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: true }, // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'id'
    }),
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
