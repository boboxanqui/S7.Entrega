export interface webForm {
    pagina: boolean;
    pagines: paginesForm;
    consultoria: boolean;
    campanya: boolean
}

export interface paginesForm {
    pagines: number;
    idiomes: number
}

export interface pressupost {
    nom: string;
    client: string;
    servei: webForm;
    preu: number;
    data: Date;
}