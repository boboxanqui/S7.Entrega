import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PressupostService } from 'src/app/services/pressupost.service';

import { pressupost } from '../interfaces/web.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent  {

  constructor( 
    private fb: FormBuilder,
    private pressupostService: PressupostService,
  ) { }

  webForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    client: ['', [Validators.required]],
    pagina: [false],
    consultoria: [false],
    campanya: [false]
  })

  mostrarError: boolean = false;

  preuTotal(): number {
    this.pressupostService.setWebFormChecks( this.webForm.value )

    return this.pressupostService.pressupostTotal();
  }

  mostrarPanell() {
    return this.webForm.controls['pagina'].value;
  }

  campValid ( camp: string ){
    return this.webForm.controls[camp].invalid && this.mostrarError;
  }

  guardar() {

    if( this.webForm.invalid || this.preuTotal() == 0 ){
      this.mostrarError = true;
      return
    }
   let nouPressupost: pressupost = {
      nom: this.webForm.get('nom')?.value,
      client: this.webForm.get('client')?.value,
      servei: {
        pagina: this.webForm.get('pagina')?.value,
        consultoria: this.webForm.get('consultoria')?.value,
        campanya: this.webForm.get('campanya')?.value,
        pagines: {
          pagines: this.pressupostService.paginesForm.pagines,
          idiomes: this.pressupostService.paginesForm.idiomes
        }
      },
      preu: this.preuTotal(),
      data: new Date()
    }
    this.pressupostService.pushPressupost(nouPressupost);
    this.webForm.reset();
    this.mostrarError = false;
  }

  
}
