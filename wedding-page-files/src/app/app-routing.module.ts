import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  { 
    path: 'homepage',
    loadChildren: () => import('./homePage/homePage.module').then( m => m.HomePageModule)
  },
  { 
    path: 'confirmationpage',
    loadChildren: () => import('./confirmationPage/confirmationPage.module')
    .then( m => m.ConfirmationPageModule)
  },
  {
    path: 'guestList',
    loadChildren: () => import('./editGuestListPage/editGuestListPage.module')
    .then(m => m.EditGuestListPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
