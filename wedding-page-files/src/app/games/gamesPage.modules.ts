import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesPageRoutingModule } from './gamesPage-routing.modules';

import { GamesPage } from './gamesPage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesPageRoutingModule
  ],
  declarations: [GamesPage]
})
export class GamesPageModule {}