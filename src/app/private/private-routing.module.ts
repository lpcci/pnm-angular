import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {
    path: 'vehicles',
    pathMatch: 'full',
    component: VehiclesComponent,
  },
  {
    path: 'lists',
    pathMatch: 'full',
    component: ListsComponent,
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: '/vehicles',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
