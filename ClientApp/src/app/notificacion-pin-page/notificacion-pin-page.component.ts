import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion-pin-page',
  templateUrl: './notificacion-pin-page.component.html',
  styleUrls: ['./notificacion-pin-page.component.css']
})
export class NotificacionPinPageComponent implements OnInit {
  tarjetaID
  constructor(private router: Router) { 
    this.tarjetaID=this.router.getCurrentNavigation().extras.state.tarjetaID
  }

  ngOnInit() {
  }
  goNext(){
    this.router.navigate(['/']);
  }
}
