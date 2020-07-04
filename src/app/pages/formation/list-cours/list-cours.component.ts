import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from 'src/app/_services/formation.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  
  tagName:string;
  titleFormation:string; 
  idFormation:string;
  coursData;

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private formationService: FormationService) { }

  getParams(){
    this.route.params.subscribe((params)=>{
          this.tagName = params.tagName;
          this.titleFormation = params.titleFormation;
          this.idFormation = params.idFormation;
          this.getCours(this.idFormation);
    });
  }

  getCours(id){
      this.formationService.getDataCours(id).subscribe((res)=>{
          this.coursData = res;
          // console.log(res); 
      });
  }

  ngOnInit() {
      setTimeout(() => {
        this.ngxLoader.stop();
      }, 700);

      this.getParams();
  }

}
