import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificacion-retiro-page',
  templateUrl: './notificacion-retiro-page.component.html',
  styleUrls: ['./notificacion-retiro-page.component.css']
})
export class NotificacionRetiroPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goNext(){
    this.router.navigate(['/']);
  }
}
