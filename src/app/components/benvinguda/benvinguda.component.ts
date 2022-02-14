import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PressupostService } from 'src/app/services/pressupost.service';

@Component({
  selector: 'app-benvinguda',
  templateUrl: './benvinguda.component.html',
  styles: [
  ]
})
export class BenvingudaComponent {

  constructor( 
    private router: Router,
    private presssupostService: PressupostService
  ) { }

  caracteristiques: string[] = [ 'Multipagina', 'Multiidoma', 'SEO', 'Google Ads']

  mostrarHome(){
    this.router.navigate(['home'], {
      // queryParams: {
      //   nom: '',
      //   client: '',
      //   pagina: false,
      //   pagines: 1,
      //   idiomes: 1,
      //   consultoria: false,
      //   campanya: false,
      // },
      // replaceUrl: true,
      // queryParamsHandling: 'merge',
      
    })
  }

}
