import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago-monto-page',
  templateUrl: './pago-monto-page.component.html',
  styleUrls: ['./pago-monto-page.component.css']
})
export class PagoMontoPageComponent implements OnInit {
  tarjetaID
  cuentaBancaria
  saldo
  monto
  correlativo
  error
  errorMessage
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) { 
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
    this.saldo=this.router.getCurrentNavigation().extras.state.saldo
    this.cuentaBancaria=this.router.getCurrentNavigation().extras.state.cuentaBancaria
    this.correlativo=this.router.getCurrentNavigation().extras.state.correlativo
  }

  ngOnInit() {
  }
  goNext(){
    let item={
      TarjetaId:Number.parseInt(this.tarjetaID),
      Monto: Number.parseInt(this.monto),
      Correlativo: this.correlativo,
      TipoServicio:'T'
    }
    this.http.put<any>(this.baseUrl + 'api/cuentaBancarias/pago-servicio',item).subscribe(result => {
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
    //this.router.navigate(['/notificacion-deposito']);

  }
  goBack(){
    this.router.navigate(['/']);
  }
}
