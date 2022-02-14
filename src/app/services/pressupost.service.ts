import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { paginesForm, pressupost, webForm } from "../components/interfaces/web.interfaces";


@Injectable()

export class PressupostService {

    constructor() { }

    private _webFormChecks: webForm = {
        pagina: false,
        consultoria: false,
        campanya: false,
        pagines: this.paginesForm
    }
    private _paginesForm: paginesForm = {
        pagines: 1,
        idiomes: 1
    }
    private _modalText: string = '';
    private _pressupostArr: pressupost[] = [];

    // GETTERS
    get webFormChecks(): webForm {
        return this._webFormChecks;
    }

    get paginesForm(): paginesForm {
        return this._paginesForm;
    }

    get modalText(): string {
        return this._modalText;
    }
    get pressupostArr(): pressupost[] {
        return [...this._pressupostArr];
    }

    // SETTERS
    setWebFormChecks(webForm: webForm) {
        this._webFormChecks = webForm;
    }

    setPaginesForm(paginesForm: paginesForm) {
        this._paginesForm = paginesForm;
    }

    setModalText(text: string) {
        this._modalText = text;
    }

    // METHODS
    pressupostTotal(): number {

        let total = 0;

        if (this.webFormChecks.pagina) {
            total += (500 + (this._paginesForm.pagines * this._paginesForm.idiomes * 30))
        }
        if (this.webFormChecks.consultoria) { total += (300) }
        if (this.webFormChecks.campanya) { total += (200) }

        return total;
    }

    pushPressupost(pressu: pressupost) {
        this._pressupostArr.push(pressu);
    }

    ordenarPerNom() {
        this._pressupostArr.sort((a, b) => {
            if (a.nom < b.nom) { return -1 }
            if (a.nom > b.nom) { return 1 }
            return 0;
        });
    }

    ordenarPerData() {
        this._pressupostArr.sort((a, b) => b.data.getTime() - a.data.getTime())
    }

    ordenarPerPreu() {
        this._pressupostArr.sort((a, b) => b.preu - a.preu)
    }

    ordenarPerInici() {
        this._pressupostArr.sort((a, b) => a.data.getTime() - b.data.getTime())
    }

    buscarPressupost(nom: string): pressupost[] {
        return this.pressupostArr.filter((pressu) =>
            pressu.nom.includes(nom))
    }
}