import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Leaflet from 'leaflet';
import { HttpParams, HttpClient } from '@angular/common/http/';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loaded: any = 0;

  selectedLocalisable: string = "all";
  selectedLevel: string = "level1";

  constructor(
    public navCtrl: NavController,
	private httpClient: HttpClient,
    ) {

	}

	ionViewDidLoad() {
		if(!this.loaded) {
			this.loadmap()
			this.loaded = 1
		}
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

  	let apiURL = "http://closed.power-heberg.com/industRICM/api/";
  	//let data = {staff: [{username: "Bernard", idStaff: "1", date: "42", longitude: "5", latitude: "7"},{username: "Maxime",idStaff: "2", date: "43", longitude: "8", latitude: "7"}]}
	
  	this.httpClient.post(apiURL+'histo/searchLast.php', {}/*JSON.stringify(credentials)*/).subscribe(
      data => {
        let markerGroup = Leaflet.featureGroup();
    	  // let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
    	  for (let e of data.staff) {
    		  var customPopup = "<strong>"+e.name+"</strong><br>"+e.locationX+" - "+e.locationY
    		  let marker: any = Leaflet.marker([Number(e.locationX), Number(e.locationY)]/*{lat: e.latitude, lon: e.longitude}*/, {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
    		markerGroup.addLayer(marker);
    	  }
    	  this.map.addLayer(markerGroup);
    		//console.log(data);
    		//this.nav.setRoot('MenuPage');
      }, 
      error => { 
        console.log(error);
      }
    );

    // var customPopup = "<strong>"+this.username+"</strong><br>"+10+" - "+10;
  	// let markerGroup = Leaflet.featureGroup();
  	// // let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false});
  	// let marker: any = Leaflet.marker([0, 0], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false});
  	// markerGroup.addLayer(marker);
  	// this.map.addLayer(markerGroup);
  }

  onLocalisableChanged(segmentButton) {
    switch (segmentButton.value) {
      case "all":
        // displayAllMarkers()
        console.log("displayAllMarkers()");
        break;
      case "staff":
        // displayStaffMarkers()
        console.log("displayStaffMarkers()");
        break;
      case "equipement":
        // displayEquipementMarkers
        console.log("displayEquipementMarkers()");
        break;      
      default:
        throw new Error("Unexpected segment value");
    }
  }

  onLevelChanged(segmentButton){
    switch (segmentButton.value) {
      case "level1":
        console.log("displayLevel1()");
        break;
      case "level2":
        console.log("displayLevel2()");
        break;
      case "level3":
        console.log("displayLevel3()");
        break;      
      default:
        throw new Error("Unexpected segment value");
    }
  }
}
