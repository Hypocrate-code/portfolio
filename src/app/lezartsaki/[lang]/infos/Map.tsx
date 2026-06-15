"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from "./page.module.css"
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'


function Map() {
  return (
    <MapContainer className={styles.map} center={[49.268, 4.042]} zoom={12} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker icon={new Icon({ iconUrl: "/lezartsaki/assets/infos/marker-icon.png"})} position={[49.27416179132926, 4.038129421260918]}>
      <Popup>La Cartonnerie</Popup>
    </Marker>
  </MapContainer>
  )
}

export default Map