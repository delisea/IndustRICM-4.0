import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, PopoverController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MapPage } from '../pages/map/map';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search'

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    SettingsPage,
    SearchPage
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
    SearchPage
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
  ]
})
export class AppModule {}
