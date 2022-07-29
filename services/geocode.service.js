import googleMapsApi from "./googlemaps.api.service";

const getGeocodeByPlaceId = async (placeId) =>
  googleMapsApi.get("/geocode/json", { params: { place_id: placeId, key: process.env.GOOGLE_MAPS_API_KEY } });


export default getGeocodeByPlaceId;