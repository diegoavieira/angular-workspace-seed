import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../core/config/config.service';

@Component({
  selector: 'web-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private configService: ConfigService) {}

  ngOnInit() {}

  logout() {
    this.configService.keycloak.logout();
  }
}
