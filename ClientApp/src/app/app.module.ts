import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PrincipalComponent } from './principal/principal.component';
import { PinPageComponent } from './pin-page/pin-page.component';
import { OperacionPageComponent } from './operacion-page/operacion-page.component';
import { RetiroPageComponent } from './retiro-page/retiro-page.component';
import { NotificacionRetiroPageComponent } from './notificacion-retiro-page/notificacion-retiro-page.component';
import { CambioPinPageComponent } from './cambio-pin-page/cambio-pin-page.component';
import { NotificacionPinPageComponent } from './notificacion-pin-page/notificacion-pin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PrincipalComponent,
    PinPageComponent,
    OperacionPageComponent,
    RetiroPageComponent,
    NotificacionRetiroPageComponent,
    CambioPinPageComponent,
    NotificacionPinPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PrincipalComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'pin-page', component: PinPageComponent },
      { path: 'operaciones', component: OperacionPageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
