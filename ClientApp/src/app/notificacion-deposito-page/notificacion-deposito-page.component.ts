import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion-deposito-page',
  templateUrl: './notificacion-deposito-page.component.html',
  styleUrls: ['./notificacion-deposito-page.component.css']
})
export class NotificacionDepositoPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goNext(){
    this.router.navigate(['/']);
  }
}
