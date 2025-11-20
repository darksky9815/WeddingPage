import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesPage } from './gamesPage.page';

const routes: Routes = [
  {
    path: '',
    component: GamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesPageRoutingModule {}