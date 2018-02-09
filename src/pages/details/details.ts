import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Localisable } from '../search/search';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  myLocalisable: Localisable;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myLocalisable = navParams.get("resultParam");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
