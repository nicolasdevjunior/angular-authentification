import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationRoutingModule } from './formation-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/_shared/shared/shared.module';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { CoursContentComponent } from './cours-content/cours-content.component';
import { NouveauSousCategoryComponent } from './nouveau-sous-category/nouveau-sous-category.component';
import { AddCoursComponent } from './add-cours/add-cours.component';


@NgModule({
  declarations: [ListComponent, ListCoursComponent, CoursContentComponent, NouveauSousCategoryComponent, AddCoursComponent],
  imports: [
    SharedModule,
    CommonModule,
    FormationRoutingModule
  ],
  exports:[
      ListComponent,
  ],
  providers:[
    
  ]
})
export class FormationModule { }
