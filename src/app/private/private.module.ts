import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists/lists.component';
import { PrivateRoutingModule } from './private-routing.module';
import { UsersComponent } from './users/users.component';
import { VehiclesTabComponent } from './vehicles/vehicles-tab/vehicles-tab.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehiclesDialogComponent } from './vehicles/vehicles-dialog/vehicles-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    ListsComponent,
    VehiclesComponent,
    VehiclesTabComponent,
    VehiclesDialogComponent,
  ],
  imports: [PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
