import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItineraryPageRoutingModule } from './itineraryPage-routing.modules';

import { ItineraryPage } from './itineraryPage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItineraryPageRoutingModule
  ],
  declarations: [ItineraryPage]
})
export class ItineraryPageModule {}