import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmationPageRoutingModule } from './confirmationPage-routing.modules';

import { ConfirmationPage } from './confirmationPage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmationPageRoutingModule
  ],
  declarations: [ConfirmationPage]
})
export class ConfirmationPageModule {}