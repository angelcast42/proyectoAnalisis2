import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operacion-page',
  templateUrl: './operacion-page.component.html',
  styleUrls: ['./operacion-page.component.css']
})
export class OperacionPageComponent implements OnInit {
  tarjetaID
  numeroTarjeta
  constructor(private router: Router) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
    this.numeroTarjeta=this.router.getCurrentNavigation().extras.state.numeroTarjeta
   }

  ngOnInit() {
  }
  goNext(page){
    if(page=='deposito'){
      this.router.navigate(['/deposito-cuenta'],{state:{tarjetaID:this.tarjetaID}}); 
    }
    else if(page=='cambioPin'){
      this.router.navigate(['/cambio-pin'],{state:{tarjetaID:this.tarjetaID}}); 
    }
    else if(page=='consultaSaldo'){
      this.router.navigate(['/consulta-saldo'],{state:{tarjetaID:this.tarjetaID,numeroTarjeta:this.numeroTarjeta}});
    }
    else if(page=='retiro'){
      this.router.navigate(['/retiro'],{state:{tarjetaID:this.tarjetaID}});
    }
    else if(page=='pago'){
      this.router.navigate(['/pago'],{state:{tarjetaID:this.tarjetaID}});
    }

  }
  goBack(){
    this.router.navigate(['/']);
  }
}
