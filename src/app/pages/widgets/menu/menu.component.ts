import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationService } from 'src/app/_services/formation.service';
import { Category } from 'src/app/_interfaces/category.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() categoryDataEvent = new EventEmitter<Category[]>();

  private listCategory;
  constructor(private ngxLoader: NgxUiLoaderService,private formationService:FormationService) { 
     
  }

  getNewValue(value){
      this.listCategory.unshift(value);
  }

  getFormations(){
      this.formationService.getListCategory().subscribe((res:Category[])=>{
          this.listCategory = res;
          this.categoryDataEvent.emit(res); 
      });
  }

  ngOnInit() {
     this.ngxLoader.start();
     this.getFormations();
  }

}
