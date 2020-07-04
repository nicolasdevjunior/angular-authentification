import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/_interfaces/category.interface';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { FormationService } from 'src/app/_services/formation.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-nouveau-sous-category',
  templateUrl: './nouveau-sous-category.component.html',
  styleUrls: ['./nouveau-sous-category.component.css']
})
export class NouveauSousCategoryComponent implements OnInit {

  addSousCategoryForm: FormGroup;
  @Input() allCategory: Category[];
  categorySelected: string;

  validation_messages = {
    'categoryID': [
      { type: 'required', message: 'Categorie requis.' },
    ],
    'cover': [
      { type: 'required', message: 'Photo requis.' },
    ],
    'title': [
      { type: 'required', message: 'Nom requis.' },
      { type: 'minlength', message: 'Le champ nom doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 155.' },
      { type: 'pattern', message: 'Nom ne doit contenir que des lettres et chiffres.' },
    ],
    'description': [
      { type: 'required', message: 'Description requis.' },
      { type: 'minlength', message: 'Le champ description doit contenir au moins 3 caractères.' },
      { type: 'maxlength', message: 'Nombre de caractères maximum: 255.' },
      { type: 'pattern', message: 'Description ne doit contenir que des lettres et chiffres.' },
    ],
  }

  private idCategory:string;
  private categoryTagName:string;

  constructor(private formBuilder: FormBuilder,private router: Router , private formationService: FormationService,private route: ActivatedRoute) { }

  selectCategory(category: Category) {
    this.categorySelected = '(' + category.categoryName + ')';
    this.idCategory = category._id;
    this.categoryTagName = category.tagName;
    this.addSousCategoryForm.get('categoryID').setValue(category._id)
  }



  addSousCategory() {
    const formData = new FormData();
    formData.append("formationName", this.addSousCategoryForm.value.title);
    if(this.addSousCategoryForm.value.description != '') {
        formData.append("description", this.addSousCategoryForm.value.description);
    }
    formData.append("idCategory", this.addSousCategoryForm.value.categoryID);
    formData.append("image", this.addSousCategoryForm.get('cover').value);

    // console.log("data >", this.addSousCategoryForm.value.categoryID);
    this.formationService.addSousCategory(formData).subscribe((res: Category) => {
        this.closemodal();
        this.router.navigate(['/formation/'+this.categoryTagName.toLowerCase()+'/'+this.idCategory]);
        // this.router.
    });
  }

  onCoverChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addSousCategoryForm.get('cover').setValue(file);
    }
  }

  closemodal() {
    $('#modal-nouveau-sous-category').modal('hide');
  }

  ngOnInit() {
    this.addSousCategoryForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[ a-zA-Z]+$')
      ])),
      description: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.pattern('^[ a-zA-Z0-9]+$')
      ])),
      categoryID: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cover: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

  }

}


