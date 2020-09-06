import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminpreventasPage } from './adminpreventas.page';

describe('AdminpreventasPage', () => {
  let component: AdminpreventasPage;
  let fixture: ComponentFixture<AdminpreventasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpreventasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminpreventasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
