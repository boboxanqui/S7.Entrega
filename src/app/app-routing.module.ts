import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BenvingudaComponent } from "./components/benvinguda/benvinguda.component";
import { HomeComponent } from "./components/home/home.component";
import { ModalComponent } from "./components/modal/modal.component";

const routes: Routes = [
    {
        path: 'benvinguda',
        component: BenvingudaComponent,
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'modal',
        component:ModalComponent
    },
    {
        path:'**',
        redirectTo:'benvinguda'
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {


}
