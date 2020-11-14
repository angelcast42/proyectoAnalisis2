import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-deposito-confirmacion-page',
  templateUrl: './deposito-confirmacion-page.component.html',
  styleUrls: ['./deposito-confirmacion-page.component.css']
})
export class DepositoConfirmacionPageComponent implements OnInit {
  nombreCuenta
  cuentaBancaria
  tarjetaID
  error
  errorMessage
  monto
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
    this.nombreCuenta=this.router.getCurrentNavigation().extras.state.nombreCuenta
    this.cuentaBancaria=this.router.getCurrentNavigation().extras.state.cuentaBancaria
    console.log("nombre cuenta",this.nombreCuenta)
   }

  ngOnInit() {
  }
  goNext(){
    let item={
      TarjetaId:Number.parseInt(this.tarjetaID),
      CuentaBancaria:this.cuentaBancaria,
      Monto:Number.parseInt(this.monto)
    }
    this.http.put<any>(this.baseUrl + 'api/cuentaBancarias/deposito',item).subscribe(result => {
      if(result.message=='Saldo Insuficiente'){
        this.error=true
        this.errorMessage='Saldo Insuficiente'
        console.log("result",result)
      }
      else{
        console.log("result",result)
        this.router.navigate(['notificacion-deposito'],{state:{tarjetaID:this.tarjetaID}});
      }
    }, error => this.error=true);   
  }
  goBack(){
    this.router.navigate(['/']);
  }
}
