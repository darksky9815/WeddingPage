import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablesPageRoutingModule } from './tablesPage-routing.modules';

import { TablesPage } from './tablesPage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablesPageRoutingModule
  ],
  declarations: [TablesPage]
})
export class TablesPageModule {}