import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PressupostService } from './services/pressupost.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PanellComponent } from './components/panell/panell.component';
import { BenvingudaComponent } from './components/benvinguda/benvinguda.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { PressupostListComponent } from './components/pressupost-list/pressupost-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanellComponent,
    BenvingudaComponent,
    ModalComponent,
    PressupostListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PressupostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
