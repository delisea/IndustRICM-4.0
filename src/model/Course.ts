import { } from '@types/googlemaps';
import { Device } from '@ionic-native/device';
import { User } from "./User";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

export class Course {

  nbUsers: number = 0;
  users: User[];
  creationDate: Date;
  geolocation: Geolocation;
  startingPosition: google.maps.LatLng;

  constructor(
  ) {
    this.creationDate = new Date();
    this.users = new Array<User>();
  }

  public getUsersList(): Array<User> {
    return this.users;
  }

  public addUser(user: User) {
    this.users[this.nbUsers] = user;
    this.nbUsers++;
  }


}
