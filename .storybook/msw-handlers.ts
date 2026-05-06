import { http, HttpResponse } from 'msw';
import { restaurantsCompleteData, restaurants } from '../src/stub/restaurants';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

export const mswHandlers = [
  // GET all restaurants (no query params)
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    // Get restaurant by id
    if (id) {
      const restaurant = restaurantsCompleteData.find((r) => r.id === id);
      if (restaurant) {
        return HttpResponse.json(restaurant);
      }
      return new HttpResponse(null, { status: 404 });
    }

    // Get restaurants by category
    if (category) {
      const filtered = restaurantsCompleteData.filter((r) =>
        r.categories?.includes(category)
      );
      return HttpResponse.json(filtered);
    }

    // Return all restaurants (without details, matching the real API)
    return HttpResponse.json(restaurants);
  }),
];
