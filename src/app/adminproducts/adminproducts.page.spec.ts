import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminproductsPage } from './adminproducts.page';

describe('AdminproductsPage', () => {
  let component: AdminproductsPage;
  let fixture: ComponentFixture<AdminproductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminproductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
