import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin-page',
  templateUrl: './pin-page.component.html',
  styleUrls: ['./pin-page.component.css']
})
export class PinPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goNext(){
    this.router.navigate(['/operaciones']); 
  }
}
