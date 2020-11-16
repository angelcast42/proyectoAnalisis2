import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  tarjeta
  error=false
  constructor(private router: Router,public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) { 

  }

  ngOnInit() {
  }
  goNext(){
    this.http.get<any>(this.baseUrl + 'api/cuentaBancarias/tarjeta/'+this.tarjeta).subscribe(result => {
      this.router.navigate(['/pin-page'],{state:{tarjeta:this.tarjeta}});
    }, error => this.error=true); 
  }
}
