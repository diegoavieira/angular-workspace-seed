import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppBaseHrefProvider } from './core/providers/app-base-href.provider';
import { AppInitializerProvider } from './core/providers/app-initializer.provider';
import { AuthInterceptorProvider } from './core/providers/http-interceptors.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule],
  providers: [AppBaseHrefProvider, AppInitializerProvider, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
