import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauCategoryComponent } from './nouveau-category.component';

describe('NouveauCategoryComponent', () => {
  let component: NouveauCategoryComponent;
  let fixture: ComponentFixture<NouveauCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
