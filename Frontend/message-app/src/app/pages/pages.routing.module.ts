import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'chats' , loadChildren : () => import("./chats/chats.module").then(module=>module.ChatsModule)},
  {path: 'auth' , loadChildren : () => import("./auth/auth.module").then(module=>module.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
