import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrls: ['./pin-page.component.css']
})
export class PinPageComponent implements OnInit {
  tarjeta
  pin
  error
  constructor(private router: Router,public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 
    this.tarjeta= this.router.getCurrentNavigation().extras.state.tarjeta
  }

  ngOnInit() {
  }
  goNext(){
    this.http.get<any>(this.baseUrl + 'api/cuentaBancarias/tarjeta/'+this.tarjeta+'/pin/'+this.pin).subscribe(result => {
      console.log("data",result)
      this.router.navigate(['/operaciones'],{state:{tarjetaID:result.data,numeroTarjeta:this.tarjeta}});
    }, error => this.error=true);  
  }
  goBack(){
    this.router.navigate(['/']);
  }
}
