import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormationService } from 'src/app/_services/formation.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/_interfaces/category.interface';

declare var $: any;
 
@Component({
  selector: 'app-nouveau-category',
  templateUrl: './nouveau-category.component.html',
  styleUrls: ['./nouveau-category.component.css']
})
export class NouveauCategoryComponent implements OnInit {

  addCategoryForm : FormGroup;
  errorBool : boolean = false;
  @Output() categoryEvent = new EventEmitter<Category>();

  constructor(private formBuilder: FormBuilder,private formationService:FormationService,
    private router: Router) { }

  validation_messages = {
    'categoryName': [
        { type: 'required', message: 'Nom requis.' },
        { type: 'minlength', message: 'Le champ nom categorie doit contenir au moins 3 caractères.' },
        { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
        { type: 'pattern', message: 'Nom  categorie ne doit contenir que des lettres et chiffres.' },
    ],
    'description': [
      { type: 'required', message: 'Description requis.' },
      { type: 'minlength', message: 'Le champ description doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Description ne doit contenir que des lettres et chiffres.' },
  ],
  }

  addCategory()
  {
      var data = {
          categoryName : this.addCategoryForm.value.categoryName,
          description :  this.addCategoryForm.value.description
      }
      
      this.formationService.addCategory(data).subscribe((res:Category)=>{
          this.categoryEvent.emit(res);
          this.closemodal();
      },(err)=>{
          if(err == 'Found'){
              this.errorBool = true;
          }
      });
  }

  closemodal()
  {
      $('#modal-nouveau').modal('hide'); 
  }

  ngOnInit() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[ a-zA-Z-&0-9]+$')
      ])),
      description: new FormControl('', Validators.compose([
          Validators.minLength(2),
          Validators.pattern('^[ a-zA-Z0-9]+$')
      ])),
    });
  }

}
