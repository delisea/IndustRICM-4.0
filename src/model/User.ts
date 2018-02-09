import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';

export class User {

  private UID: string;
  private device: Device;

  constructor(
    private Name: string,
    private Geolocation: google.maps.LatLng,
    private Smartphone: boolean,
    private ESP: boolean,
    private SOS: boolean,
  ) {
    this.device = new Device();
    this.UID = this.device.uuid;
  }


}
