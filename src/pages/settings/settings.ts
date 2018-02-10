import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpParams, HttpClient } from '@angular/common/http/';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  apiURL = "http://closed.power-heberg.com/industRICM/api/";

  constructor(public navCtrl: NavController, private httpClient: HttpClient, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Panne déclenchée',
    subTitle: 'La panne de la machine à bien été simulée.',
    buttons: ['continuer']
  });
  alert.present();
}
  
	trigger_alert() {
		let params = new HttpParams().set('params', "{\"id\": \"4\"}");
		this.httpClient.post<dataItem>(this.apiURL+'maintenance/alert.php', params).subscribe(
      data => {
			this.presentAlert();
        },
        //console.log(data);
        //this.nav.setRoot('MenuPage');, 
      error => { 
			this.presentAlert();
      }
    );
		/*if(this.flag)
			return;
		this.flag= true;
		this.auth.login(this.registerCredentials).subscribe(data => {
        console.log(data);
        if(true){
			this.nav.setRoot('MenuPage');
		}
    }, error => {
            console.log(error);
	});*/
  }
}
