'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

export const GoogleMap = () => {
  const position = { lat: 45.323236601619016, lng: -85.24322617394134 }
  const markerPosition = { lat: 45.32169770408702, lng: -85.24585473864487 }
  return (
    <div className="h-[350px]">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          // style={{ width: '100%', height: '100%' }}
          defaultZoom={16}
          defaultCenter={position}
          disableDefaultUI
        >
          <Marker position={markerPosition} />
        </Map>
      </APIProvider>
    </div>
  )
}
