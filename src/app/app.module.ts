import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search'; 
import { DetailsPage } from '../pages/details/details';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    SettingsPage,
    SearchPage,
    DetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    SettingsPage,
    SearchPage,
    DetailsPage,
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
  ]
})
export class AppModule {}
