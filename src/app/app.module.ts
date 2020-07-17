import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ''
    },
    {
      provide: 'BASE_URL',
      useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
