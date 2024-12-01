import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantTchatComponent } from './instant-tchat.component';

describe('InstantTchatComponent', () => {
  let component: InstantTchatComponent;
  let fixture: ComponentFixture<InstantTchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstantTchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstantTchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
