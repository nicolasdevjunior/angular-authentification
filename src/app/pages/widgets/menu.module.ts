import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { NgxUiLoaderModule,NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouveauCategoryComponent } from '../formation/nouveau-category/nouveau-category.component';
import { ModalDeconnexionComponent } from '../modal-deconnexion/modal-deconnexion.component';
import { MenuWithoutLoaderComponent } from './menu-without-loader/menu-without-loader.component';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#009245",
  pbColor : "#009245",
  fgsColor: "#009245",
  fgsSize : 150,
  fgsPosition: POSITION.centerCenter, 
  logoPosition : "center-center",
  fgsType: SPINNER.ballScaleMultiple, // foreground spinner type  //ballScaleMultiple
  // logoUrl: 'assets/image/logo.png',
  // logoSize : 250,
  text : "Veuillez patientez s'il vous plaît...",
  textColor: "#009245",
  textPosition : "center-center",
  overlayColor : "rgba(0,0,0,0.9)",
  hasProgressBar : true,
  gap: 70,
};

@NgModule({
  declarations: [MenuComponent,NouveauCategoryComponent,ModalDeconnexionComponent, MenuWithoutLoaderComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MenuRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  exports : [ MenuComponent,NouveauCategoryComponent,MenuWithoutLoaderComponent]
})
export class MenuModule { }
