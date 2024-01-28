import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrDetallePage } from './qr-detalle.page';

describe('QrDetallePage', () => {
  let component: QrDetallePage;
  let fixture: ComponentFixture<QrDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
