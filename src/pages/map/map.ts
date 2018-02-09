import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Leaflet from 'leaflet';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  popover:any;

  constructor(
    public navCtrl: NavController,
    ) {

  }

  ionViewDidLoad() {
    this.loadmap();
  }

  loadmap() {
    this.map = Leaflet.map("map", {attributionControl: false}).fitWorld();
    Leaflet.control.scale({imperial: false}).addTo(this.map);
    Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0,
      maxZoom: 18,
    }).addTo(this.map);

    var IconGreen = Leaflet.icon({
      iconUrl: "../../assets/imgs/pointer_green.png",
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15, 30]
});

  }

}
