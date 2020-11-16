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
  selector: 'app-cambio-pin-page',
  templateUrl: './cambio-pin-page.component.html',
  styleUrls: ['./cambio-pin-page.component.css']
})
export class CambioPinPageComponent implements OnInit {
  tarjetaID
  error
  pinActual
  nuevoPin
  confirmarPin
  constructor(private router: Router,public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
  }

  ngOnInit() {
  }
goNext(){
  if(this.nuevoPin==this.confirmarPin){
    let cambioPin={
      'TarjetaId':Number.parseInt(this.tarjetaID),
      'OldPin':this.pinActual,
      'NewPin': this.nuevoPin
    }
    console.log("item",cambioPin)
    this.http.put<any>(this.baseUrl + 'api/cuentaBancarias/cambiar-pin',cambioPin,httpOptions).subscribe(result => {
      console.log("data",result)
      this.router.navigate(['/notificacion-pin'],{state:{tarjetaID:this.tarjetaID}});
    }, error => this.error=true);      
  }
}
}
