import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PressupostService } from 'src/app/services/pressupost.service';
import { pressupost } from '../interfaces/web.interfaces';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styles: [`
    a{
      user-select: none
    }
    #listItem:hover {
      background-color: whitesmoke
    }
  `]
})
export class PressupostListComponent {

  constructor( private pressupostService: PressupostService) { }

  buscador: FormGroup = new FormGroup ({
    buscarNom: new FormControl('')
  })

  pressuList: pressupost[] = [];
  detalls: boolean[] = [];

  get pressupostList() {
    if( this.buscador.controls['buscarNom'].value.length > 0){
      return this.pressupostService.buscarPressupost(
        this.buscador.controls['buscarNom'].value
      )
    }
    this.pressuList = this.pressupostService.pressupostArr;
    return this.pressupostService.pressupostArr;
  }

  mostrarLlista(): boolean{
    if( this.pressupostService.pressupostArr.length == 0 ){ return false} 
    return true;
  }

  mostrarDetalls( index: number ) {
    if(this.detalls[index] ){ 
      this.detalls[index] = false;
    }else{
      this.detalls[index] = true;
    }
  }

  preuPagines ( pressu: pressupost ): number{
    return (pressu.servei.pagines.pagines * pressu.servei.pagines.idiomes * 30) + 500
  }

  ordenarPerNom(){
    this.pressupostService.ordenarPerNom();
  }

  ordenarPerData(){
    this.pressupostService.ordenarPerData()
  }

  ordenarPerPreu(){
    this.pressupostService.ordenarPerPreu();
  }

  ordenarPerInici(){
    this.pressupostService.ordenarPerInici()
  }

}
