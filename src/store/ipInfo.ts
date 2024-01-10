import { atom } from 'nanostores'
import type { IpApi } from '../types/ipApi'

export const $ipInfo = atom<IpApi>({
  ip: '',
  location: {
    country: '',
    region: '',
    timezone: '',
    city: '',
    lat: 0,
    lng: 0,
    postalCode: '',
    geonameId: 0
  },
  as: {
    asn: 0,
    name: '',
    route: '',
    domain: '',
    type: ''
  },
  isp: '',
  domains: []
})

export const changeIpAddress = (info: IpApi) => {
  $ipInfo.set(info)
}
