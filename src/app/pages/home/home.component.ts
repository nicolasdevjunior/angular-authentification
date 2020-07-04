import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 1000);

  }

}
