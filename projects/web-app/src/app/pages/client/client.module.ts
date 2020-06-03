import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { AdsThemingModule, AdsToolbarModule } from '@adsystem/common';

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, ClientRoutingModule, AdsThemingModule, AdsToolbarModule]
})
export class ClientModule {}
