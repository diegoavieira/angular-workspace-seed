import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'web-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logout() {}
}
