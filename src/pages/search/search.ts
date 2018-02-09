import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from "../details/details"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


export interface Localisable{
  categorie: string;
  id: number;
  name: string;
}


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  results: Observable<Localisable[]>;
  pushPage: any;
  searchQuery: string;
  selectedLocalisable: string = "all";
  
  allLocalisablesExample: Localisable[] = allLocalisablesExample;
  equipementExample: Localisable[] = equipementExample;
  staffExample: Localisable[] = staffExample;


  constructor(public navCtrl: NavController) {
    this.searchQuery ;
    this.searchItems();
    this.pushPage = DetailsPage;
  }

  onSegmentChanged(segmentButton) {
    console.log("Change");
    this.searchItems();
  }

  fetchResults(query: string): Observable<Localisable[]> {
    // TODO : NYI
    switch (this.selectedLocalisable) {
      case "all":
      return Observable.of(this.allLocalisablesExample);
      case "staff":
      return Observable.of(this.staffExample);
      case "equipement":
      return Observable.of(this.equipementExample);      
      default:
      throw new Error("Unexpected localisable type");
    }
  }

  searchItems(): void {
    if (this.searchQuery) {
      this.results = this.fetchResults(this.searchQuery);
    }
    else {
      console.log("Empty list");
      this.results = Observable.of([]);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
}






const allLocalisablesExample: Localisable[] = [
{
  categorie: "staff",
  id: 0,
  name: "Didier Donsez",
}, 
{
  categorie: "staff",
  id: 1,
  name: "Alan Turing",
},
{
  categorie: "staff",
  id: 2,
  name: "Richard Stallman",
},  
{
  categorie: "equipement",
  id: 0,
  name: "Torque wrench",
}, 
{
  categorie: "equipement",
  id: 1,
  name: "Hydrolic column drill",
},
{
  categorie: "equipement",
  id: 2,
  name: "Grease gun",
}
];
export const staffExample: Localisable[] = [
{
  categorie: "staff",
  id: 0,
  name: "Didier Donsez",
}, 
{
  categorie: "staff",
  id: 1,
  name: "Alan Turing",
},
{
  categorie: "staff",
  id: 2,
  name: "Richard Stallman",
},  
]; 
export const equipementExample: Localisable[] = [
{
  categorie: "equipement",
  id: 0,
  name: "Torque wrench",
}, 
{
  categorie: "equipement",
  id: 1,
  name: "Hydrolic column drill",
},
{
  categorie: "equipement",
  id: 2,
  name: "Grease gun",
}
];