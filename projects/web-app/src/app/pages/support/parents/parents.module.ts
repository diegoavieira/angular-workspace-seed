import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';

@NgModule({
  declarations: [ParentsComponent],
  imports: [CommonModule, ParentsRoutingModule]
})
export class ParentsModule {}
