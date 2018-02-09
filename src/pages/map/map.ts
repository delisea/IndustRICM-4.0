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

	let data = {staff: [{idStaff: "1", date: "42", longitude: "5", latitude: "7"},{idStaff: "2", date: "43", longitude: "8", latitude: "7"}]}
	
	let markerGroup = Leaflet.featureGroup();
	// let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
	for (let e of data.staff) {
		var customPopup = "<strong>"+e.username+"</strong><br>"+e.latitude+" - "+e.longitude
		let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
		markerGroup.addLayer(marker);
	}
	this.map.addLayer(markerGroup);
	
	
	if(0)
	this.http.post(apiURL+'histo/searchLast.php', {}/*JSON.stringify(credentials)*/).subscribe(data => {
		console.log(data);
		this.nav.setRoot('MenuPage');
	});

    /*var customPopup = "<strong>"+this.username+"</strong><br>"+10+" - "+10
	let markerGroup = Leaflet.featureGroup();
	// let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
	let marker: any = Leaflet.marker([0, 0], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
	markerGroup.addLayer(marker);
	this.map.addLayer(markerGroup);*/
  }

}
