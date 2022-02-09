import { Injectable } from "@angular/core";
import { paginesForm, webForm } from "../components/interfaces/web.interfaces";


@Injectable()

export class PressupostService {

    constructor () {}

    private _pressupost: number = 0;
    private _webFormChecks: webForm = {
        pagina: false,
        consultoria: false,
        campanya: false
    }
    private _paginesForm: paginesForm = {
        pagines: 1,
        idiomes: 1
    }

    // GETTERS
    get pressupost (): number {
        return this._pressupost;
    }

    get webFormChecks (): webForm {
        return this._webFormChecks;
    }

    // SETTERS
    
    setPressupost( preu: number ){
        this._pressupost += preu;
    }

    setWebFormChecks ( webForm: webForm ){
        this._webFormChecks = webForm;
    }

    setPaginesForm ( paginesForm: paginesForm ){
        this._paginesForm = paginesForm;
    }
    
    // METHODS
    pressupostTotal(): number {

        this._pressupost = 0;

        if( this.webFormChecks.pagina ) { 
            this.setPressupost( 500 + (this._paginesForm.pagines * this._paginesForm.idiomes * 30) ) 
        }
        if( this.webFormChecks.consultoria ) { this.setPressupost( 300 ) }
        if( this.webFormChecks.campanya )    { this.setPressupost( 200 ) }       

        return this.pressupost;
    }
}