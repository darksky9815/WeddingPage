import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesPage } from './tablesPage.page';

const routes: Routes = [
  {
    path: '',
    component: TablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesPageRoutingModule {}