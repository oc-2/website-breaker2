import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

import { GoogleMapsModule } from '@angular/google-maps';
import { NgAisModule } from 'angular-instantsearch';

import { AppComponent } from './app.component';
import { GeoSearchComponent } from './geo-search.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, GeoSearchComponent],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    NgAisModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
