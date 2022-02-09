import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PressupostService } from 'src/app/services/pressupost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent  {

  constructor( 
    private fb: FormBuilder,
    private pressupostService: PressupostService,
    private router: Router
  ) { }


  webForm: FormGroup = this.fb.group({
    pagina: [false],
    consultoria: [false],
    campanya: [false]
  })

  preuTotal(): number {

    this.pressupostService.setWebFormChecks( this.webForm.value )

    return this.pressupostService.pressupostTotal();
  }


  mostrarPanell() {
    return this.webForm.controls['pagina'].value;
  }

  
}
