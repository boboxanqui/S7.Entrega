import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PressupostService } from 'src/app/services/pressupost.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styles: [`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input {
      max-width: 50px;
    }
  `]
})
export class PanellComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private pressupostService: PressupostService
  ) { }

  ngOnInit(): void {

    this.paginesForm.reset({
      pagines: 1,
      idiomes: 1
    })
    this.enviarForm()
  }

  ngOnDestroy(): void {
    this.paginesForm.reset({
      pagines: 1,
      idiomes: 1
    })
    this.enviarForm()
  }

  paginesForm: FormGroup = this.fb.group({
    pagines: [0, [Validators.min(1), Validators.required]],
    idiomes: [0, [Validators.min(1), Validators.required]]
  })

  modalPagines(textPagines: boolean) {
    this.pressupostService.setModalText(textPagines)
  }

  enviarForm() {
    this.pressupostService.setPaginesForm(this.paginesForm.value)
  }

  incrementar(form: string) {
    this.paginesForm.controls[form].setValue(this.paginesForm.get(form)?.value + 1);
    this.enviarForm()
  }

  decrementar(form: string) {
    if (this.paginesForm.get(form)?.value > 1) {
      this.paginesForm.controls[form].setValue(this.paginesForm.get(form)?.value - 1);
      this.enviarForm()
    }
  }

}
