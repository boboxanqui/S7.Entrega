import { Component } from '@angular/core';
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
export class PanellComponent {

  constructor(
    private fb: FormBuilder,
    private pressupostService: PressupostService
  ) { }


  paginesForm: FormGroup = this.fb.group({
    pagines: [1, [Validators.min(1), Validators.required]],
    idiomes: [1, [Validators.min(1), Validators.required]]
  })

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
