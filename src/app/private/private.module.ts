import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists/lists.component';
import { PrivateRoutingModule } from './private-routing.module';
import { UsersComponent } from './users/users.component';
import { VehiclesTabComponent } from './vehicles/vehicles-tab/vehicles-tab.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesDialogComponent } from './vehicles/vehicles-dialog/vehicles-dialog.component';
import { UsersDialogComponent } from './users/users-dialog/users-dialog.component';
import { UsersTabComponent } from './users/users-tab/users-tab.component';
import { ListsTabComponent } from './lists/lists-tab/lists-tab.component';
import { ListsDialogComponent } from './lists/lists-dialog/lists-dialog.component';
import { ItemsDialogComponent } from './lists/items-dialog/items-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    ListsComponent,
    VehiclesComponent,
    VehiclesTabComponent,
    VehiclesDialogComponent,
    UsersDialogComponent,
    UsersTabComponent,
    ListsTabComponent,
    ListsDialogComponent,
    ItemsDialogComponent,
  ],
  imports: [PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
