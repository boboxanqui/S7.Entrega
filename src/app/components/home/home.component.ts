import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PressupostService } from 'src/app/services/pressupost.service';

import { paginesForm, pressupost } from '../interfaces/web.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private pressupostService: PressupostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Inicia con valores del URL
    this.webForm.setValue({
      nom: this.activatedRoute.snapshot.queryParamMap.get('nom'),
      client: this.activatedRoute.snapshot.queryParamMap.get('client'),
      pagina: this.activatedRoute.snapshot.queryParamMap.get('pagina'),
      consultoria: this.activatedRoute.snapshot.queryParamMap.get('consultoria'),
      campanya: this.activatedRoute.snapshot.queryParamMap.get('campanya'),
    })

    // Recoge valores del Formulario de paginas y idiomas para cargar precio
    this.paginesForm = {
      pagines: Number(this.activatedRoute.snapshot.queryParamMap.get('pagines')) || 1 ,
      idiomes: Number(this.activatedRoute.snapshot.queryParamMap.get('idiomes')) || 1    
    }
    this.pressupostService.setPaginesForm$(this.paginesForm)

    // Añade queryParams del Formulario de paginas y idiomas
    this._paginesFormSub = this.pressupostService.paginesForm$.subscribe( observer => {    
      this.paginesForm = observer;
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          pagines: this.paginesForm.pagines == 1 ? null : this.paginesForm.pagines,
          idiomes: this.paginesForm.idiomes == 1 ? null : this.paginesForm.idiomes,
          },
        queryParamsHandling: 'merge'
      })
    })

    // Añade queryParams del Formulario de nuevo presupuesto
    this._webFormSub = this.webForm.valueChanges.subscribe( (_) => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          nom: this.webForm.get('nom')?.value,
          client: this.webForm.get('client')?.value,
          pagina: (this.webForm.get('pagina')?.value==false || this.webForm.get('pagina')?.value==null) ? null : true,
          consultoria: (this.webForm.get('consultoria')?.value==false || this.webForm.get('consultoria')?.value==null) ? null : true,
          campanya: (this.webForm.get('campanya')?.value==false || this.webForm.get('campanya')?.value==null) ? null : true,
          },
        queryParamsHandling: 'merge'
      })
    })
  }

  ngOnDestroy(): void {
    this._webFormSub.unsubscribe();
    this._paginesFormSub.unsubscribe();
  }

  webForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    client: ['', [Validators.required]],
    pagina: [false],
    consultoria: [false],
    campanya: [false],
  })

  paginesForm: paginesForm = {
    pagines: 1,
    idiomes: 1
  }

  // Objetos Subscription para gestionar los subscribe() del onInit
  private _webFormSub: Subscription = new Subscription;
  private _paginesFormSub: Subscription = new Subscription;

  mostrarError: boolean = false;

  preuTotal(): number {
    this.pressupostService.setWebFormChecks(this.webForm.value)

    return this.pressupostService.pressupostTotal();
  }

  mostrarPanell() {
    return this.webForm.controls['pagina'].value;
  }

  campValid(camp: string) {
    return this.webForm.controls[camp].invalid && this.mostrarError;
  }

  guardar() {

    if (this.webForm.invalid || this.preuTotal() == 0) {
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
