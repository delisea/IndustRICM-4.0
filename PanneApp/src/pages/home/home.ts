import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

constructor(private alertCtrl: AlertController) {

}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Panne déclenchée',
    subTitle: 'La panne de la machine à bien été simulée.',
    buttons: ['continuer']
  });
  alert.present();
}

  constructor(public navCtrl: NavController) {

  }
  
	trigger_alert() {
		this.presentAlert();
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
