'use client'

import { CompanyInfo } from '@/payload-types'
import { APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps'
import { LandPlot } from 'lucide-react'


export const GoogleMap = ({ contact }: { contact: CompanyInfo['contact'] }) => {
  const { name, physicalAddress } = contact ?? {}
  const { coordinates, street, cityStateZip } = physicalAddress ?? {}
  const { lat, lng } = coordinates ?? {}
  const defaultPosition = { lat: 45.323236601619016, lng: -85.24322617394134 }

  const position = lat && lng ? { lat, lng } : defaultPosition

  return (
    <div className="h-[350px]">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultZoom={16}
          defaultCenter={position}
          disableDefaultUI

        >
          <InfoWindow
            position={position}
            shouldFocus={false}
            headerContent={
              <div className="flex gap-4 items-center">
                <LandPlot className="size-8 text-primary shrink-0" />
                <div className="flex flex-col gap-4">
                  <h3 className="text-base font-bold text-balance leading-5">{name}</h3>
                </div>
              </div>
            }
          >
            <div className="flex flex-col pt-2 pl-12">
              <p className="text-sm text-gray-500">{street}</p>
              <p className="text-sm text-gray-500">{cityStateZip}</p>
            </div>
          </InfoWindow>
        </Map>
      </APIProvider>
    </div>
  )
}
