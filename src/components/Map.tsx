import { useStore } from '@nanostores/react'
import { $ipInfo } from '../store/ipInfo'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { useState, type FC, useEffect } from "react"
import "leaflet/dist/leaflet.css"
import { icon } from 'leaflet'

const Map: FC = () => {
  const data = useStore($ipInfo)
  const [latLng, setLatLng] = useState<{lat: any, lng: any}>()
  
  const ChangeMapView = () => {
    const map = useMap()
    map.setView([data.location.lat, data.location.lng], 14)
    return null
  }

  useEffect(() => {
    const handleLocation = () => {
      setLatLng({
        lat: data.location.lat,
        lng: data.location.lng
      })
    }
    handleLocation()
  }, [data.location.lat, data.location.lng])

  if (!latLng?.lat) {
    return (
      <div className="flex items-center justify-center h-full">
	    	<div className="border-t-4 border-r-4 border-blue-500 border-solid h-16 w-16 rounded-full animate-spin" />
	    </div>
    )
  }

  return (
    <MapContainer style={{ height: '100%', zIndex: 0 }} center={[latLng?.lat, latLng?.lng]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon({iconUrl: '/svg/icon-location.svg'})} position={[latLng?.lat, latLng?.lng]} />
      <ChangeMapView />
    </MapContainer>
  )
}

export default Map
