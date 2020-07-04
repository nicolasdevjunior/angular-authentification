import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeconnexionComponent } from './modal-deconnexion.component';

describe('ModalDeconnexionComponent', () => {
  let component: ModalDeconnexionComponent;
  let fixture: ComponentFixture<ModalDeconnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeconnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
