import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-retiro-page',
  templateUrl: './retiro-page.component.html',
  styleUrls: ['./retiro-page.component.css']
})
export class RetiroPageComponent implements OnInit {
  tarjetaID
  error
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
   }

  ngOnInit() {
  }
 goNext(monto){
  let item={
    TarjetaId:Number.parseInt(this.tarjetaID),
    Monto: Number.parseInt(monto),
    tipoCuenta: 'M'
  }
  this.http.put<any>(this.baseUrl + 'api/cuentaBancarias/retiro',item).subscribe(result => {
    console.log("data",result)
    this.router.navigate(['/notificacion-retiro'],{state:{tarjetaID:this.tarjetaID}});
  }, error => this.error=true);
 }
 goBack(){
  this.router.navigate(['/']);
}
}
