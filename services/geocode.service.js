import googleMapsApi from "./googlemaps.api.service";

export const getGeocodeByPlaceId = async (placeId) =>
  googleMapsApi.get("/geocode/json", {
    params: { place_id: placeId, key: process.env.GOOGLE_MAPS_API_KEY },
  });

export const getPlaceIdByGeocode = async (lat, lng) => {
  const { data } = await googleMapsApi.get("/geocode/json", {
    params: { latlng: `${lat},${lng}`, key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY },
  });
  const { place_id } = data.results[0] || {};
  return place_id;
};

