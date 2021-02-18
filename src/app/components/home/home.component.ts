import { Component, OnInit } from '@angular/core';
import { Marker } from '../../models/Marker.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latitude: number
  longitude: number
  markers: Marker[]
  marker: Marker
  zoom: number
  map: google.maps.Map

  constructor() {
    this.latitude = 0
    this.longitude = 0
    this.markers = []
    this.zoom = 8
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
      this.markers.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        label: '',
        draggable: true,
        animation: google.maps.Animation.DROP
      })
    })
    console.log(this.markers);
  }

  onclick_(e) {
    this.markers.push({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
      label: 'Manizales',
      draggable: true,
      animation: google.maps.Animation.DROP,
    })
    console.log(this.markers);
  }


  clickedMarker(label: string, index: number) {
    alert(`Marcador #${label || index}`)
  }

  markerRightClick_(label: string, index: number) {
    const confirmDelete = confirm('¿ Eliminar este marcador ?')
    if (confirmDelete) {
      this.markers.splice(index, 1)
    } else {
      alert(`Marcador #${label || index}`)
    }
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.map.addListener('click', (e: google.maps.MouseEvent) => {
      console.log(e);

      console.log(e.latLng.lat(), e.latLng.lng());
      this.markers.push({
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng(),
        label: '',
        draggable: true,
        animation: google.maps.Animation.DROP

      })
      console.log(this.markers);
    });
  }

}
