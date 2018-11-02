import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/_common/guards/auth.guard';

// *Public Components*
import { ErrorComponent } from 'src/app/error/error.component';
import { HomeComponent } from 'src/app/home/home.component';
import { UserProfileComponent } from 'src/app/user-profile/public/user-profile.component';
import { GroupProfileComponent } from 'src/app/group-profile/public/group-profile.component';
import { PortfolioComponent } from 'src/app/portfolio/portfolio.component';
import { GameProfileComponent } from 'src/app/game-profile/public/game-profile.component';
import { GameJamComponent } from 'src/app/game-jam/game-jam.component';

// *Secure Components*
import { UserProfileManagementComponent } from 'src/app/user-profile/secure/user-profile-management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'members', children: [
      { path: '', component: ErrorComponent, pathMatch: 'full' },
      { path: ':userId', component: UserProfileComponent }
    ]
  },
  // {
  //   path: 'groups', children: [
  //     { path: '', component: ErrorComponent, pathMatch: 'full' },
  //     { path: ':groupId', component: GroupProfileComponent }
  //   ]
  // },
  {
    path: 'portfolio', children: [
      { path: '', component: PortfolioComponent, pathMatch: 'full' },
      {
        path: 'games', children: [
          { path: '', component: ErrorComponent, pathMatch: 'full' },
          { path: ':gameId', component: GameProfileComponent }
        ]
      }
    ]
  },
  {
    path: 'game-jam', component: GameJamComponent
  },
  // {
  //   path: 'manage', canActivate: [AuthGuard], children: [
  //     { path: '', component: ErrorComponent, pathMatch: 'full' },
  //     { path: 'me', component: UserProfileManagementComponent }
  //   ]
  // },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
