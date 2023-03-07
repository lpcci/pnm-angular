import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';


@NgModule({
  declarations: [
    HeaderBarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [HeaderBarComponent]
})
export class CoreModule { }
