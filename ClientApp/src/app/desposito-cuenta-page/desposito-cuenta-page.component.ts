import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desposito-cuenta-page',
  templateUrl: './desposito-cuenta-page.component.html',
  styleUrls: ['./desposito-cuenta-page.component.css']
})
export class DespositoCuentaPageComponent implements OnInit {
  cuenta
  tarjetaID
  error
  constructor(private router: Router,public http: HttpClient,@Inject('BASE_URL') public baseUrl: string) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
   }

  ngOnInit() {
  }
  goNext(){
    this.http.get<any>(this.baseUrl + 'api/cuentaBancarias/cuentabancaria/'+this.cuenta).subscribe(result => {
      console.log("data",result)
      this.router.navigate(['/deposito-confirmacion'],{state:{tarjetaID:this.tarjetaID,nombreCuenta:result.data,cuentaBancaria:this.cuenta}});
    }, error => this.error=true);   
  }
  goBack(){
    this.router.navigate(['/']);
  }
}
