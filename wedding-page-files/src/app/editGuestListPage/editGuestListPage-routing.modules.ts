import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGuestListPage } from './editGuestListPage.page';

const routes: Routes = [
  {
    path: '',
    component: EditGuestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGuestListPageRoutingModule {}