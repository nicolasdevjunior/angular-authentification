import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormationService } from 'src/app/_services/formation.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Category } from 'src/app/_interfaces/category.interface';
import { endPoint } from '../../../constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private idCategory;
  private allCategory: Category[];
  private formations;
  private tagName;
  private error : boolean = false;
  private dataIsLoaded : boolean = false;
  mySubscription: any;

  endPoint: string = endPoint;
  constructor(private route: ActivatedRoute,private router: Router,private formationService: FormationService) { 
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {      
          this.router.navigated = false;      
        }
      });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  } 

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.params.subscribe((params) => {
      this.idCategory = params.id;
      this.tagName = params.tagName.toLowerCase();
      this.getSousCategory(this.idCategory,this.tagName);
    });
  }

  getAllCategory(data) {
    this.allCategory = data;
    // console.log("list",data);
  }

  getSousCategory(id,tagName) {
    this.formationService.getListSousCategory(id,tagName).subscribe((res) => {
      // console.log(res);
      setTimeout(()=>{
        this.dataIsLoaded = true;
      },1000)
      this.formations = res;
    },(err)=>{
        // console.log(err);
        this.error = true;
    });
  }



}
