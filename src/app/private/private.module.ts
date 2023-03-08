import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists/lists.component';
import { PrivateRoutingModule } from './private-routing.module';
import { UsersComponent } from './users/users.component';
import { VehiclesTabComponent } from './vehicles/vehicles-tab/vehicles-tab.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

@NgModule({
  declarations: [
    UsersComponent,
    ListsComponent,
    VehiclesComponent,
    VehiclesTabComponent,
  ],
  imports: [PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
