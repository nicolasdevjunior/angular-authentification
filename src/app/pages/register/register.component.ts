import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterService } from 'src/app/_services/register.service';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { User } from '../../_interfaces/user.interface';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private msgHide: boolean = true;
  errorString: string;

  loading = false;
  registerForm: FormGroup;
  currentUser: User;
  identificationForm: FormGroup;
  personnalForm: FormGroup;
  coverForm: FormGroup;
  matching_passwords_group: FormGroup;
  submitted = false;
  returnUrl: string;
  politicState: boolean = true;
  error = '';
  success = '';
  moisStart = 1;
  jourStart = 1;
  anneeStart = 1950;

  constructor(private formBuilder: FormBuilder, private router: Router, private ngxLoader: NgxUiLoaderService, private registerService: RegisterService,
    private authenticationService: AuthenticationService) {
    this.isConnected();
  }

  isConnected() {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser != null) {
      this.router.navigate(['/home']);
    }
  }

  validation_messages = {
    'nom': [
      { type: 'required', message: 'Nom requis.' },
      { type: 'minlength', message: 'Nom doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Nom ne doit contenir que des lettres et chiffres.' },
    ],
    'prenom': [
      { type: 'required', message: 'Prénom requis.' },
      { type: 'minlength', message: 'Prénom doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Prénom ne doit contenir que des lettres et chiffres.' },
    ],
    'numero': [
      { type: 'required', message: 'Numero requis.' },
      { type: 'minlength', message: 'Numero doit contenir au moins 9 chiffres.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 10.' },
      { type: 'pattern', message: 'Numero ne doit contenir que des lettres et chiffres.' },
    ],
    'adresse': [
      { type: 'required', message: 'Adresse requis.' },
      { type: 'minlength', message: 'Adresse doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Adresse ne doit contenir que des lettres et chiffres.' },
    ],
    'appellation': [
      { type: 'required', message: 'Appellation requis.' },
      { type: 'minlength', message: 'Appellation doit contenir au moins 2 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Appellation ne doit contenir que des lettres et chiffres.' },
    ],
    'email': [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Entrer un email valide.' },
      { type: 'validUsername', message: 'Email dejà pris.' },
    ],
    'cover': [
      { type: 'required', message: 'Photo de couverture requis.' },
    ],
    'profil': [
      { type: 'required', message: 'Photo de profil requis.' },
    ],
    'piece': [
      { type: 'required', message: 'Pièce d\'identité requis.' },
    ],
    'password': [
      { type: 'required', message: 'Mot de passe requis.' },
    ],
    'naissance': [
      { type: 'required', message: 'Date de naissance requis.' },
    ],
    'confirm_password': [
      { type: 'required', message: 'Mot de passe de confirmation requis.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Les 2 mots de passe doit être identique.' }
    ],
  }

  initForm() {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.identificationForm = this.formBuilder.group({
      matching_passwords: this.matching_passwords_group,

      email: new FormControl('', Validators.compose([
        // Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      numero: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        Validators.minLength(9),
        Validators.required,
        Validators.pattern('^[0-9+]+$')
      ])),
    });

    this.coverForm = this.formBuilder.group({
      profil: new FormControl('', Validators.compose([
        // Validators.required
      ])),

      cover: new FormControl('', Validators.compose([
        // Validators.required
      ])),
    });

    this.personnalForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[ a-zA-Zéçèêà-]+$')
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required,
        Validators.pattern('^[ a-zA-Zéçèêà-]+$')
      ])),

      adresse: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required,
        Validators.pattern('^[ a-zA-Z]+$')
      ])),

      appellation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[ a-zA-Z]+$')
      ])),

      piece: new FormControl('', Validators.compose([
        Validators.required
      ])),

      naissance: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

  }


  ngOnInit() {
    // setTimeout(() => {
    //   this.ngxLoader.stop();
    // }, 500);


    $(document).ready(function () {

      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
      var current = 1;
      var steps = $("fieldset").length;

      setProgressBar(current);

      $(".next").click(function () {

        current_fs = $(this).parent().parent();
        next_fs = $(this).parent().parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            next_fs.css({ 'opacity': opacity });
          },
          duration: 500
        });
        setProgressBar(++current);
      });

      $(".previous").click(function () {

        current_fs = $(this).parent().parent();
        previous_fs = $(this).parent().parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
          step: function (now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
              'display': 'none',
              'position': 'relative'
            });
            previous_fs.css({ 'opacity': opacity });
          },
          duration: 500
        });
        setProgressBar(--current);
      });

      function setProgressBar(curStep) {
        var percent = Number(100 / steps) * curStep;
        percent = Number(percent.toFixed());
        $(".progress-bar")
          .css("width", percent + "%")
      }

      $(".submit").click(function () {
        return false;
      })

    });

    this.initForm();

    // this.f.adresse.

  }

  loginAfterRegister(username, password) {
    this.authenticationService.login(username, password)
      .pipe(first())
      .subscribe((data) => {
        // console.log("token",data);
        if (data.access_token != null) {
          this.router.navigate(['/']);
        } else {
          this.error = data;
        }
      },
        error => {
          this.error = error;
        });
  }

  finish() {

    var opacity;
    var current = 3;
    var steps = 3;

    var current_fs = $("fieldset:nth-of-type(3)");
    var next_fs = $(".successfinish");

    //Add Class Active
    $("#progressbar li:last").addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({ opacity: 0 }, {
      step: function (now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({ 'opacity': opacity });
      },
      duration: 500
    });
    this.setProgressBar(++current, steps);
  }

  setProgressBar(curStep, steps) {
    var percent = Number(100 / steps) * curStep;
    percent = Number(percent.toFixed());
    $(".progress-bar")
      .css("width", percent + "%")
  }

  get f() { return this.personnalForm.controls; }
  get cover() { return this.coverForm.controls; }
  get i() { return this.identificationForm.controls; }

  signup() {
    if (this.personnalForm.invalid && this.coverForm.invalid && this.identificationForm.invalid) {
      //
    } else {
      const formData = new FormData();

      formData.append("username", this.personnalForm.value.nom);
      formData.append("nickname", this.personnalForm.value.appellation);
      formData.append("password", this.identificationForm.get('matching_passwords').get('password').value);
      formData.append("firstname", this.personnalForm.value.prenom);
      formData.append("email", this.identificationForm.value.email);
      formData.append("birth", this.personnalForm.value.naissance);
      formData.append("adress", this.personnalForm.value.adresse);
      formData.append("number", this.identificationForm.value.numero);
      formData.append("files", this.personnalForm.get('piece').value);
      formData.append("files", this.coverForm.get('cover').value);
      formData.append("files", this.coverForm.get('profil').value);

      console.log(formData);

      this.registerService.addUser(formData).subscribe((res) => {
        console.log(res);
        if (res.email != null) {
          this.success = "Utilisateur enregistré avec succès";
          this.finish();
          this.loginAfterRegister(this.identificationForm.value.email,this.identificationForm.get('matching_passwords').get('password').value);
        } else {
          this.error = "Email déjà utilisé";
        }
      }, err => {
        this.error = err;
      })
    }

  }

  onProfilChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverForm.get('profil').setValue(file);
    }
  }

  onCoverChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverForm.get('cover').setValue(file);
    }
  }

  onPieceChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personnalForm.get('piece').setValue(file);
    }
  }

  clickOnAlert() {
    this.msgHide = false;
  }
}
