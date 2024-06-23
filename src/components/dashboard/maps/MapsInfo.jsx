import { divIcon, Icon, point } from 'leaflet'

export const ZOOM_LEVEL = 13

export const sendIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9561/9561845.png',
  iconSize: [38, 38]
})

export const destinationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1483/1483336.png',
  iconSize: [38, 38]
})

export const createCustomClusterIcon = (cluster) => {
  return new divIcon({
    html: `<div class='h-12 w-12 rounded-full bg-white transform translate-x-[-50%] translate-y-[-50%] flex justify-center items-center font-[900] text-xl text-black'>${cluster.getChildCount()}</div>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true)
  })
}

export const initialMarkerInfo = {
  coords: null,
  name: '',
  description: ''
}
