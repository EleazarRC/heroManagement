import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroTableComponent } from './superhero-table.component';

describe('SuperheroTableComponent', () => {
  let component: SuperheroTableComponent;
  let fixture: ComponentFixture<SuperheroTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
