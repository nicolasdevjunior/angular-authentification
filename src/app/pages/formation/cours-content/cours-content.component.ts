import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cours-content',
  templateUrl: './cours-content.component.html',
  styleUrls: ['./cours-content.component.css']
})
export class CoursContentComponent implements OnInit {

  idCategory: string;
  idSousCategory: string;
  idCours: string;
  constructor(private ngxLoader: NgxUiLoaderService, private route: ActivatedRoute) { }

  getId() {
    this.route.params.subscribe((params) => {
      this.idCategory = params.id;
      this.idSousCategory = params.idSousCategory;
      this.idCours = params.idCours;
      // this.getCategoryByID(this.idCategory);
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 700);
    this.getId();
  }

}
