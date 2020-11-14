import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Component({
  selector: 'app-consulta-saldo-page',
  templateUrl: './consulta-saldo-page.component.html',
  styleUrls: ['./consulta-saldo-page.component.css']
})
export class ConsultaSaldoPageComponent implements OnInit {
  Saldo
  UltimosMovimientos
  tarjetaID
  error
  numeroTarjeta
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
    this.numeroTarjeta=this.router.getCurrentNavigation().extras.state.numeroTarjeta
    this.http.get<any>(this.baseUrl + 'api/cuentaBancarias/saldo/'+this.numeroTarjeta,httpOptions).subscribe(result => {
      let data:any= JSON.parse(result.data)
      data=JSON.parse(data)
      this.Saldo=data.Saldo;
      this.UltimosMovimientos=data.UltimosMovimientos
    }, error => this.error=true);  
   }

  ngOnInit() {
  }
  goNext(){
    this.router.navigate(['/']);
  }
}
