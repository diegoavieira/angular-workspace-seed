import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'web-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userProfile: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userProfile = this.authService.userProfile;
  }

  logout() {
    this.authService.logout();
  }
}
