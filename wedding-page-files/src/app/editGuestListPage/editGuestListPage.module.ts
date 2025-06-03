import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGuestListPageRoutingModule } from './editGuestListPage-routing.modules';

import { EditGuestListPage } from './editGuestListPage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGuestListPageRoutingModule
  ],
  declarations: [EditGuestListPage]
})
export class EditGuestListPageModule {}