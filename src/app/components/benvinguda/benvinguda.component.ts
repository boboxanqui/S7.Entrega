import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benvinguda',
  templateUrl: './benvinguda.component.html',
  styles: [
  ]
})
export class BenvingudaComponent {

  constructor( private router: Router ) { }

  caracteristiques: string[] = [ 'Multipagina', 'Multiidoma', 'SEO', 'Google Ads']

  mostrarHome(){
    this.router.navigate(['home'])
  }

}
