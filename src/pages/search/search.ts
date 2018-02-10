import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { DetailsPage } from "../details/details"
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http/';

import 'rxjs/add/observable/of';


export interface LocalisableP{
  name: string;
  id: number;
  position: {
	  locationX: number;
	  locationY: number;
	  floor: number;
  }
}

export interface LocalisableM{
  name: string;
  id: number;
  categorie: string;
  position: {
	  locationX: number;
	  locationY: number;
	  floor: number;
  }
}

export type Localisable = LocalisableP|LocalisableM;

export interface resu {
	records: Localisable[];
}


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  @ViewChild('searchInput') searchInput: Searchbar;

  results: Localisable[];
  pushPage: any;
  searchQuery: string;
  selectedLocalisable: string = "all";


  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    this.searchQuery ;
    this.searchItems();
    this.pushPage = DetailsPage;
  }

  onSegmentChanged(segmentButton) {
    this.searchItems();
  }

  fetchResults(query: string): Observable<resu> {
    // FIXME : add real url prefix 
    let url: string = "http://closed.power-heberg.com/industRICM/api/" + this.selectedLocalisable + '/get.php';
    console.log(url);
    let params = new HttpParams().set('params', query);
    return this.httpClient.post<resu>(url, params);
  }

  searchItems(): void {
    if (this.searchQuery) {
      this.fetchResults(JSON.stringify({name: this.searchQuery})).subscribe(data => {
		  console.log(data);
		  this.results =  data.records;
		  console.log(this.results);
	  });
    }
    else {
      this.results = [];
    }
  }

  onClick(loc:Localisable){
    this.navCtrl.push(this.pushPage, { resultParam: loc });
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.searchInput.setFocus();
    },150);

  }

}