import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-modal-deconnexion',
  templateUrl: './modal-deconnexion.component.html',
  styleUrls: ['./modal-deconnexion.component.css']
})
export class ModalDeconnexionComponent implements OnInit {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,) { }
 
  ngOnInit() {
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  } 

}
