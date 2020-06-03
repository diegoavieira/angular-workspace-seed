import { Component, OnInit } from '@angular/core';
import { AdsTheming } from '@adsystem/common';
import { Observable } from 'rxjs';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'web-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientTheme$: Observable<AdsTheming>;
  clientDarkTheme: boolean;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.clientTheme$ = this.themeService.getTheme();
    this.clientDarkTheme = false;
  }
}
