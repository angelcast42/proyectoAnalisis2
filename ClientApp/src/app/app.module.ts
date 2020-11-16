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
import { DespositoCuentaPageComponent } from './desposito-cuenta-page/desposito-cuenta-page.component';
import { DepositoConfirmacionPageComponent } from './deposito-confirmacion-page/deposito-confirmacion-page.component';
import { NotificacionDepositoPageComponent } from './notificacion-deposito-page/notificacion-deposito-page.component';
import { ConsultaSaldoPageComponent } from './consulta-saldo-page/consulta-saldo-page.component';
import { PagoPageComponent } from './pago-page/pago-page.component';
import { PagoTelefonoPageComponent } from './pago-telefono-page/pago-telefono-page.component';
import { PagoLuzPageComponent } from './pago-luz-page/pago-luz-page.component';
import { PagoMontoPageComponent } from './pago-monto-page/pago-monto-page.component';

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
    NotificacionPinPageComponent,
    DespositoCuentaPageComponent,
    DepositoConfirmacionPageComponent,
    NotificacionDepositoPageComponent,
    ConsultaSaldoPageComponent,
    PagoPageComponent,
    PagoTelefonoPageComponent,
    PagoLuzPageComponent,
    PagoMontoPageComponent
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
      { path: 'deposito-cuenta', component: DespositoCuentaPageComponent },
      { path: 'deposito-confirmacion', component: DepositoConfirmacionPageComponent },
      { path: 'notificacion-deposito', component: NotificacionDepositoPageComponent },
      { path: 'cambio-pin', component: CambioPinPageComponent },
      { path: 'notificacion-pin', component: NotificacionPinPageComponent },
      { path: 'consulta-saldo', component: ConsultaSaldoPageComponent },
      { path: 'retiro', component: RetiroPageComponent },
      { path: 'notificacion-retiro', component: NotificacionRetiroPageComponent },
      { path: 'pago', component: PagoPageComponent },
      { path: 'pago-telefono', component: PagoTelefonoPageComponent },
      { path: 'pago-luz', component: PagoLuzPageComponent },
      { path: 'pago-monto', component: PagoMontoPageComponent },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
