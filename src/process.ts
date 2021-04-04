import { Router } from 'express';
import { Client } from '@googlemaps/google-maps-services-js';
import { municipios } from './municipios';

const processRouter = Router();
const client = new Client({});

processRouter.get('/', async (request, response) => {
  const processArray = municipios.slice(5400);

  for (let index = 0; index < processArray.length; index++) {
    const element = processArray[index];

    const location = element.name.replace(/\s/g, '+');
    const uf = element.uf.replace(/\s/g, '+');

    const geocodeResponse = await client.geocode({
      params: {
        key: process.env.GEOCODING_API_KEY || '',
        address: `${location},${uf}`
      }
    });

    const results = geocodeResponse.data.results[0];

    element.lat = results.geometry.location.lat;
    element.lng = results.geometry.location.lng;

    processArray[index] = element;
  }

  return response.json(processArray);
});

export default processRouter;