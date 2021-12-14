import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';
import { Tab1PageModule } from './tab1/tab1.module';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    , canActivate: [AuthguardService]
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'edit-note',
    loadChildren: () => import('./pages/edit-note/edit-note.module').then(()=> import('./tabs/tabs.module').then(m => m.TabsPageModule))
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
