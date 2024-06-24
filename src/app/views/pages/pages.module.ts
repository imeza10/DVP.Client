import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LayoutModule } from '../layout/layout.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BaseComponent } from '../layout/base/base.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserScoreGuard } from '../../core/user-score.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        canActivate: [UserScoreGuard]
      },
      {
        path: 'error',
        component: NotFoundComponent
      },
      {
        path: '**',
        redirectTo: '/error'
      }
    ]
  }
];

@NgModule({
  declarations: [MainComponent, ProfileComponent, NotFoundComponent, ErrorMessageComponent],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
