import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }
  
  mostrarTornar(): boolean {
    if( this.router.url.includes('benvinguda') ){
      return false
    }
    return true
  }

}
