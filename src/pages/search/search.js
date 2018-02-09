var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from "../details/details";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
var SearchPage = (function () {
    function SearchPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.selectedLocalisable = "all";
        this.allLocalisablesExample = allLocalisablesExample;
        this.equipementExample = equipementExample;
        this.staffExample = staffExample;
        this.searchQuery;
        this.searchItems();
        this.pushPage = DetailsPage;
    }
    SearchPage.prototype.onSegmentChanged = function (segmentButton) {
        this.searchItems();
    };
    SearchPage.prototype.fetchResults = function (query) {
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
    };
    SearchPage.prototype.searchItems = function () {
        if (this.searchQuery) {
            this.results = this.fetchResults(this.searchQuery);
        }
        else {
            this.results = Observable.of([]);
        }
    };
    SearchPage.prototype.onClick = function (loc) {
        console.log("Click detected");
        this.navCtrl.push(DetailsPage, { resultParam: loc });
    };
    SearchPage = __decorate([
        Component({
            selector: 'page-search',
            templateUrl: 'search.html',
        }),
        __metadata("design:paramtypes", [NavController])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
var allLocalisablesExample = [
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
export var staffExample = [
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
export var equipementExample = [
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
//# sourceMappingURL=search.js.map