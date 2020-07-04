import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterGlobalPipe } from 'src/app/_pipe/filter';
import { FilterdataPipe } from 'src/app/_pipe/filterData';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgDragDropModule } from 'ng-drag-drop';
import { FilterNullPipe } from 'src/app/_pipe/filterNull';

import { ChartsModule } from 'ng2-charts';
import { MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatLabel, MatInput, MatInputModule, MatProgressBarModule, MatIconModule, MatCardModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import { MenuModule } from '../../pages/widgets/menu.module';
import { FilterNumberPipe } from '../../_pipe/filter-number.pipe';

@NgModule({
  declarations: [
      FilterGlobalPipe, 
      FilterdataPipe ,
      FilterNullPipe,
      FilterNumberPipe
  ],
  imports:[
      NgDragDropModule.forRoot(),
      ChartsModule,
      MatSliderModule,
      MatRadioModule, 
      MatTableModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatSortModule,MatInputModule,MatProgressBarModule,MatIconModule,MatCardModule,
      MatDatepickerModule,MatNativeDateModule
  ],
  providers: [
      MatProgressSpinnerModule,MatPaginatorModule,MatInput
  ],
  exports:[
      FilterGlobalPipe, 
      FilterdataPipe ,
      FilterNullPipe,  
      FilterNumberPipe,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,   
      CommonModule,
      NgxPaginationModule,
      NgDragDropModule,
      ChartsModule,
      MatSliderModule,
      MatRadioModule, 
      MatTableModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      MatSortModule,MatInputModule,MatProgressBarModule,MatIconModule,MatCardModule,
      MatDatepickerModule,MatNativeDateModule,
      MenuModule
  ]
})
export class SharedModule { }
