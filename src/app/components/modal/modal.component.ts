import { Component } from '@angular/core';
import { PressupostService } from 'src/app/services/pressupost.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [`
    a{
      cursor: pointer;
    }
  `]
})
export class ModalComponent {

  constructor( private pressupostService: PressupostService ) { }


  //FIXME: quan es tanca modal amb idiomes es canvia a pagines

  mostrarText() {
    if (this.pressupostService.modalText) {
      return 'Indica el número de pàgines que voldràs que tingui la teva web.'
    }
    return 'Indica el número d\'idiomes que voldràs a la teva web'
  }
}
