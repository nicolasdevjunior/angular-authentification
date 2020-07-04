import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
   
  }

  hoverMo()
  {
        $("#logo").attr("src","assets/img/logo5.png");
  }

  hoverOut()
  {
        $("#logo").attr("src","assets/img/logo3.png");
  }

}
