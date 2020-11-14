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
  selector: 'app-pago-telefono-page',
  templateUrl: './pago-telefono-page.component.html',
  styleUrls: ['./pago-telefono-page.component.css']
})
export class PagoTelefonoPageComponent implements OnInit {
  tarjetaID
  telefono
  error
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
  }

  ngOnInit() {
  }
  goNext(){
    this.http.get<any>(this.baseUrl + 'api/cuentaBancarias/consulta-tel/'+this.telefono,httpOptions).subscribe(result => {
      let data:any= JSON.parse(result.data)
      data=JSON.parse(data)
      console.log("data",data)
      this.router.navigate(['/pago-monto'],{state:{tarjetaID:this.tarjetaID,saldo:data.Saldo,cuentaBancaria:data.cuentaBancaria,correlativo:this.telefono}});
    }, error => this.error=true);  
  }
}
