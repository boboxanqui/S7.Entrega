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
export class ModalComponent  {

  constructor( private pressupostService: PressupostService ) { }


  //FIXME: quan es tanca modal amb idiomes es canvia a pagines

  mostrarText() {
    return this.pressupostService.modalText
  }
}
