import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauSousCategoryComponent } from './nouveau-sous-category.component';

describe('NouveauSousCategoryComponent', () => {
  let component: NouveauSousCategoryComponent;
  let fixture: ComponentFixture<NouveauSousCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauSousCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauSousCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
