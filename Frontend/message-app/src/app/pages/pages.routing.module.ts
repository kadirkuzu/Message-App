import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../common/guards/auth.guard';
import { loggedGuard } from '../common/guards/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'chats', pathMatch: 'full' },
  { path: 'chats', loadChildren: () => import("./chats/chats.module").then(module => module.ChatsModule), canActivate: [authGuard] },
  { path: 'auth', loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule) , canActivate: [loggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
