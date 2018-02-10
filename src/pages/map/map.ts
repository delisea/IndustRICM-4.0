import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import Leaflet from 'leaflet';
import { HttpParams, HttpClient } from '@angular/common/http/';
import { AlertController } from 'ionic-angular';
import { DetailsPage } from "../details/details"

export interface mapItem{
  id: string;
  name: string;
  working: string;
  locationX: string;
  locationY: string;
  floor: string;
  date: string;
}

export interface mapItem2{
  id: string;
  name: string;
  category: string;
  locationX: string;
  locationY: string;
  floor: string;
  date: string;
}
export interface dataItem{
  staff: mapItem[];
  matt: mapItem[];
}


@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map1') mapElement: ElementRef;
  map1: any;
  map2: any;
  map3: any;
  loaded: any = 0;
  private currentTimeout: number;

  selectedLocalisable: string = "all";
  selectedLevel: string = "level1";

  basement: string = '../../../assets/basement.PNG';
  firstLevel: string = '../../../assets/firstlevel.PNG';
  secondLevel: string = '../../../assets/secondlevel.PNG';

  mapW = 2000 ;
  mapH = 2000;

  IconGreen = Leaflet.icon({
    iconUrl: "../../assets/imgs/pointer_green.png",
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30]
  });
  IconRed = Leaflet.icon({
    iconUrl: "../../assets/imgs/pointer_red.png",
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30]
  });
  IconBlue = Leaflet.icon({
    iconUrl: "../../assets/imgs/pointer_blue.png",
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 30]
  });

  apiURL = "http://closed.power-heberg.com/industRICM/api/";

  constructor(
    public navCtrl: NavController,
	  private httpClient: HttpClient,
	  private alertCtrl: AlertController,
  ) {
	setInterval(() => { this.timi() }, 5000);

	}

	ionViewDidLoad() {
    this.loadmap("map1", this.map1, 0);
    this.loadmap("map2", this.map2, 1);
    this.loadmap("map3", this.map3, 2);
	}

	timi() {console.log("top");
		let params = new HttpParams().set('params', "{\"id\": \"2\"}");
		this.httpClient.post<dataItem>(this.apiURL+'maintenance/notif.php', params).subscribe(
		  data => {
				//if(this.alertCtrl != undefined) {


let alert = this.alertCtrl.create({
					title: 'Panne affectée',
					subTitle: 'La '+" "+' est en panne, au boulot!',
    buttons: [
      {
        text: 'continuer',
        handler: () => {
          console.log(console.log(data));
			this.navCtrl.push(DetailsPage, { resultParam: data });
        }
      }
    ]
  });				
  
  
				alert.present();//}
				/*else if(this.alertCtrl != undefined) {
				let alert = this.alertCtrl.create({
					title: 'Panne affectée',
					subTitle: 'La '+" "+' est en panne, au boulot!',
					buttons: ['continuer']
				  });
				alert.present();console.log(data);}*/
			},
			//console.log(data);
			//this.nav.setRoot('MenuPage');, 
		  error => { 
		  //console.log(error);
		  }
		);
	//setInterval(() => { this.timi() }, 5000);
	}
	
  ionViewCanLeave(){
    // FIXME
    document.getElementById("map1").outerHTML = "";
    document.getElementById("map2").outerHTML = "";
    document.getElementById("map3").outerHTML = "";
  }

  onMapClick(e){
        console.log(e.latlng.lng, e.latlng.lat);
  }

	loadmap(str: string, myMap: any, floor: number) {

    myMap = Leaflet.map(str, {attributionControl: false/*, noWrap: true*/}).fitWorld();
    // Leaflet.control.scale({imperial: false}).addTo(myMap);
    let mapUrl: string ;
    switch (str) {
      case "map1":
        mapUrl = this.basement;
        break;
      case "map2":
        mapUrl = this.firstLevel;
        break;
      case "map3":
        mapUrl = this.secondLevel;
        break;
      
      default:
        throw new Error("Unexpected map level");
    }
    Leaflet.tileLayer(mapUrl, {
      minZoom: 1,
      maxZoom: 4,
      center: [0, 0],
      zoom: 1,
    }).addTo(myMap);

    var southWest = myMap.unproject([0, this.mapH], myMap.getMaxZoom()-1);
    var northEast = myMap.unproject([this.mapW, 0], myMap.getMaxZoom()-1);
    var bounds = new Leaflet.LatLngBounds(southWest, northEast);


    Leaflet.imageOverlay(mapUrl, bounds).addTo(myMap);
    myMap.setMaxBounds(bounds);

    this.httpClient.post<dataItem>(this.apiURL+'histo/searchLast.php', {}/*JSON.stringify(credentials)*/).subscribe(
      data => {
        let markerGroup = Leaflet.featureGroup();
        // let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
        for (let e of data.staff) {if(Number(e.floor) != floor) continue;
          var customPopup = "<strong>"+e.name+"</strong><br>"+e.locationX+" - "+e.locationY
          let marker: any = Leaflet.marker([Number(e.locationY), Number(e.locationX)]/*{lat: e.latitude, lon: e.longitude}*/, {icon:(Number(e.id)==2)?this.IconRed:this.IconBlue}).bindPopup(customPopup,{closeButton:false})
          markerGroup.addLayer(marker);
        }
        for (let e of data.matt) {if(Number(e.floor) != floor) continue;
          var customPopup2 = "<strong>"+e.name+"</strong><br>"+e.locationX+" - "+e.locationY
          let marker: any = Leaflet.marker([Number(e.locationY), Number(e.locationX)]/*{lat: e.latitude, lon: e.longitude}*/, {icon:this.IconGreen}).bindPopup(customPopup2,{closeButton:false})
          markerGroup.addLayer(marker);
        }
        myMap.addLayer(markerGroup);
        //console.log(data);
        //this.nav.setRoot('MenuPage');
      }, 
      error => { 
        console.log(error);
      }
    );

    myMap.on('click', (e)=>{this.onMapClick(e)});

  	// this.httpClient.post<dataItem>(this.apiURL+'histo/searchLast.php', {}/*JSON.stringify(credentials)*/).subscribe(
   //    data => {
   //      let markerGroup = Leaflet.featureGroup();
   //  	  // let marker: any = Leaflet.marker([e.latitude, e.longitude], {icon:IconGreen}).bindPopup(customPopup,{closeButton:false})
   //  	  for (let e of data.staff) {
   //  		  var customPopup = "<strong>"+e.name+"</strong><br>"+e.locationX+" - "+e.locationY
   //  		  let marker: any = Leaflet.marker([Number(e.locationX), Number(e.locationY)]/*{lat: e.latitude, lon: e.longitude}*/, {icon:this.IconGreen}).bindPopup(customPopup,{closeButton:false})
   //  		  markerGroup.addLayer(marker);
   //  	  }
   //  	  this.map.addLayer(markerGroup);
   //  		//console.log(data);
   //  		//this.nav.setRoot('MenuPage');
   //    }, 
   //    error => { 
   //      console.log(error);
   //    }
   //  );

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
        console.log("showing level1");
        document.getElementById("map1").style.display = "block";
        document.getElementById("map2").style.display = "none";
        document.getElementById("map3").style.display = "none";
        break;
      case "level2":
        console.log("showing level2");
        document.getElementById("map1").style.display = "none";
        document.getElementById("map2").style.display = "block";
        document.getElementById("map3").style.display = "none";
        break;
      case "level3":
        console.log("showing level3");
        document.getElementById("map1").style.display = "none";
        document.getElementById("map2").style.display = "none";
        document.getElementById("map3").style.display = "block";
        break;      
      default:
        throw new Error("Unexpected segment value");
    }
  }
}
