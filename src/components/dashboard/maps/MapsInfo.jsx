import { divIcon, Icon, point } from 'leaflet'

export const ZOOM_LEVEL = 12

export const ZOOM_LEVEL_FORM = 14

export const sendIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9561/9561845.png',
  iconSize: [38, 38]
})

export const destinationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1483/1483336.png',
  iconSize: [38, 38]
})

export const destinationOnEditIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/11538/11538855.png',
  iconSize: [38, 38]
})

export const destinationCompletedIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  iconSize: [38, 38]
})

export const destinationRefuseIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/10621/10621089.png',
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
