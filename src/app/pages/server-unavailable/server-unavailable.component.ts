import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-server-unavailable',
  templateUrl: './server-unavailable.component.html',
  styleUrls: ['./server-unavailable.component.css']
})
export class ServerUnavailableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hoverMo()
  {
        $("#logo").attr("src","assets/img/logo3.png");
  }

  hoverOut()
  {
        $("#logo").attr("src","assets/img/logo5.png");
  }

}
