import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrDetallePage } from './qr-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: QrDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrDetallePageRoutingModule {}
