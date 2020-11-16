import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-page',
  templateUrl: './pago-page.component.html',
  styleUrls: ['./pago-page.component.css']
})
export class PagoPageComponent implements OnInit {
  tarjetaID
  constructor(private router: Router) {
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
   }

  ngOnInit() {
  }
  goNext(page){
    if(page=='telefono'){
      this.router.navigate(['/pago-telefono'],{state:{tarjetaID:this.tarjetaID}});
    }
    else{
      this.router.navigate(['/pago-luz'],{state:{tarjetaID:this.tarjetaID}});
    }
  }
  goBack(){
    this.router.navigate(['/']);
  }
}
