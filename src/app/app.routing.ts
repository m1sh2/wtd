import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeCmp } from './home';
import { Game } from './game';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: Game }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}