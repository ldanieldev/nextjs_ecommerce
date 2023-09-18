'use client'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

type props = {
  latitude: number
  longitude: number
  popupText?: string
  zoom?: number
  scrollWheelZoom?: boolean
}

const markerIcon = L.icon({
  iconUrl: 'img/map/marker-icon.png',
  shadowUrl: 'img/map/marker-shadow.png',
  iconSize: [25, 41],
  shadowSize: [41, 41],
})

export default function MapView({
  latitude,
  longitude,
  popupText = '',
  zoom = 13,
  scrollWheelZoom = false,
}: props) {
  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      placeholder={<p>Loading Map...</p>}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
      />

      <Marker icon={markerIcon} position={[latitude, longitude]}>
        {popupText.length > 1 && <Popup>{popupText}</Popup>}
      </Marker>
    </MapContainer>
  )
}
