import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../../_services/formation.service';


@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {

  tagName:string;
  titleFormation:string; 
  idFormation:string;
  coursTitle:string;

  constructor(private ngxLoader: NgxUiLoaderService,private route: ActivatedRoute,private formationService: FormationService) { }

  getParams(){
    this.route.params.subscribe((params)=>{
          this.tagName = params.tagName;
          this.titleFormation = params.titleFormation;
          this.idFormation = params.idFormation;
    });
  }

  text :string = "<p>Titre du cours ici...</p>";
  sectionNumber = 0;
  contentNumber = 0;
  partie = [];
  x = [];
  

  addSection(){
    this.sectionNumber++;
    this.x = Array(this.sectionNumber).fill(5).map((a,i)=>i); // [0,1,2,3,4]
  }

  addContent(){
    this.contentNumber++;
    this.x = Array(this.contentNumber).fill(5).map((a,i)=>i); // [0,1,2,3,4]
  }

  addCours(){
    let data = {
        idFormation : this.idFormation,
        title : this.coursTitle
    }
     this.formationService.addDataCours(data).subscribe((res)=>{
          console.log(res);
     })
  }

  ngOnInit() {
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 700);
    this.getParams();
  }

}
