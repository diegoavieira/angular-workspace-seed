import { Component, OnInit } from '@angular/core';
import { AdsTheming } from '@adsystem/common';

@Component({
  selector: 'web-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clientTheme: AdsTheming;
  clientDarkTheme: boolean;

  constructor() {}

  ngOnInit() {
    this.clientTheme = {
      primary: 'green',
      accent: 'blue'
    };

    this.clientDarkTheme = false;
  }
}
