import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { CoursContentComponent } from './cours-content/cours-content.component';
import { AddCoursComponent } from './add-cours/add-cours.component';


const routes: Routes = [
  {
    path: ':tagName/:id',
    component: ListComponent,
  },
  {
    path: ':tagName/:titleFormation/:idFormation',
    component: ListCoursComponent,
  },
  {
    path: ':tagName/:titleFormation/:idFormation/create',
    component: AddCoursComponent,
  },
  {
    path: ':tagName/:titleFormation/:idFormation/cours/:idCours',
    component: CoursContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
