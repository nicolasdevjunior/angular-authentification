import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../_interfaces/category.interface';
import { FormationService } from '../../../_services/formation.service';

@Component({
  selector: 'app-menu-without-loader',
  templateUrl: './menu-without-loader.component.html',
  styleUrls: ['./menu-without-loader.component.css']
})
export class MenuWithoutLoaderComponent implements OnInit {

  @Output() categoryDataEvent = new EventEmitter<Category[]>();

  private listCategory;
  constructor(private formationService:FormationService) { 
    
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
     this.getFormations();
  }


}
