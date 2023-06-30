import axios from 'axios';
import { getCountryNames } from '../utils/FormatUtil';

interface PostalCodes {
  postalCodes: {
    adminCode1: string,
    adminCode2: string,
    adminName2: string,
    lng: number,
    countryCode: string,
    postalCode: string,
    adminName1: string,
    'ISO3166-2': string,
    placeName: string,
    lat: number
  }[]
}

const apiCities = axios.create({
  baseURL: 'http://api.geonames.org',
  headers: {
    'Content-Type': 'application/json',
  }
});

export async function getCities(city: string) {
  const response = await apiCities.get<PostalCodes>(`/postalCodeSearchJSON?placename_startsWith=${city}&maxRows=${city.length <= 3 ? 500 : 100}&username=${import.meta.env.VITE_GEONAMES_USERNAME}`);

  const cities = response.data.postalCodes
    .filter(newCity => newCity.placeName.toLowerCase().startsWith(city.toLowerCase()))
    .filter((newCity, index, alias) =>
      alias.findIndex(cityFound =>
        newCity.countryCode === cityFound.countryCode &&
        newCity.adminName1 === cityFound.adminName1 &&
        newCity.placeName === cityFound.placeName) === index
    )
    .map(newCity => {
      const cityName = newCity.placeName;

      return {
        countryName: getCountryNames(newCity.countryCode),
        regionName: newCity.adminName1,
        cityName
      }
    })
    .sort((a, b) => a.cityName.localeCompare(b.cityName));

  return cities
}

