import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}
}
