import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private pressupostService: PressupostService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.paginesForm.setValue({
      pagines: Number(this.activatedRoute.snapshot.queryParamMap.get('pagines')) || 1 ,
      idiomes: Number(this.activatedRoute.snapshot.queryParamMap.get('idiomes')) || 1
    })

    // this.pressupostService.setPaginesForm$(this.paginesForm.value)

    this.paginesForm.valueChanges.subscribe( (_) => {
      // this.pressupostService.setPaginesForm(this.paginesForm.value)
      this.pressupostService.setPaginesForm$(this.paginesForm.value)
    })
  }


  ngOnDestroy(): void {
    this.paginesForm.reset({
      pagines: 1,
      idiomes: 1
    })
  }

  paginesForm: FormGroup = this.fb.group({
    pagines: [0, [Validators.min(1), Validators.required]],
    idiomes: [0, [Validators.min(1), Validators.required]]
  })

  modalPagines(text: string) {
    if (text === 'idiomes' ) {
      this.pressupostService.setModalText('Indica el número d\'idiomes que voldràs a la teva web.')
    }
    if ( text === 'pagines'){
      this.pressupostService.setModalText('Indica el número de pàgines que voldràs que tingui la teva web.')
    }
  }

  incrementar(form: string) {
    this.paginesForm.controls[form].setValue(this.paginesForm.get(form)?.value + 1);
  }

  decrementar(form: string) {
    if (this.paginesForm.get(form)?.value > 1) {
      this.paginesForm.controls[form].setValue(this.paginesForm.get(form)?.value - 1);
    }
  }

}
