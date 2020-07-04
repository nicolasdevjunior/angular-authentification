import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../_services/user.service';
import { User } from '../../_interfaces/user.interface';
import { AuthenticationService } from '../../_services/authentication.service';
import { endPoint } from '../../constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData: User;
  stateNom: boolean = false;
  stateNickname: boolean = false;
  coverForm: FormGroup;
  private currentUser;
  private endPoint = endPoint;
  coverStyle: {};

  constructor(private router: Router, private formBuilder: FormBuilder, private ngxLoader: NgxUiLoaderService, private userSVC: UserService,
    private authenticationService: AuthenticationService,) {
    this.currentUser = this.authenticationService.currentUserValue;
    setTimeout(() => {
      this.getDataUser()
    }, 1000);
  }

  getDataUser() {
    this.userSVC.getProfile(this.currentUser.user._id).subscribe((res) => {
      this.profileData = res;
      this.coverStyle = {
        'background-image': 'url(' + this.endPoint + res.cover + ')'
      }
      // console.log(res);
    })
  }

  setStateNom() {
    this.stateNom = !this.stateNom;
  }

  updateNom() {
    this.setStateNom();
    this.updateData();
  }

  updateData() {
    this.userSVC.updateDataContent(this.profileData).subscribe((res) => {
        this.profileData = res;
        // console.log(res);
    });
  }

  setStateNickname() {
    this.stateNickname = !this.stateNickname;
  }

  updateNickname() {
    this.setStateNickname();
    this.updateData();
  }

  onProfilChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverForm.get('profil').setValue(file);
      const formData = new FormData();
      formData.append("profil", this.coverForm.get('profil').value);
      formData.append("id", this.profileData.id);

      this.userSVC.updateProfil(formData).subscribe((res) => {
        this.profileData.profil = res;
      });
    }
  }

  onCoverChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverForm.get('cover').setValue(file);
      const formData = new FormData();
      formData.append("cover", this.coverForm.get('cover').value);
      formData.append("id", this.profileData.id);

      this.userSVC.updateCover(formData).subscribe((res) => {
        this.profileData.cover = res;
        this.coverStyle = {
          'background-image': 'url(' + this.endPoint + res + ')'
        }
      });
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.ngxLoader.stop();
    }, 500);

    this.coverForm = this.formBuilder.group({
      profil: new FormControl(''),
      cover: new FormControl(''),
    });

  }

}
