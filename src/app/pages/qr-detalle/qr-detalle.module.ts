import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrDetallePageRoutingModule } from './qr-detalle-routing.module';

import { QrDetallePage } from './qr-detalle.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrDetallePageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrDetallePage]
})
export class QrDetallePageModule {}
