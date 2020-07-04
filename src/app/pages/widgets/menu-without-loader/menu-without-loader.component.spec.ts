import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWithoutLoaderComponent } from './menu-without-loader.component';

describe('MenuWithoutLoaderComponent', () => {
  let component: MenuWithoutLoaderComponent;
  let fixture: ComponentFixture<MenuWithoutLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuWithoutLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWithoutLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
