import { http, HttpResponse } from 'msw';
import { restaurantsCompleteData } from '../src/stub/restaurants';
import { Restaurant } from '../src/types';

export const mswHandlers = [
  http.get('https://mealdrop.netlify.app/.netlify/functions/restaurants', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    if (id) {
      // Return a single restaurant by ID
      const restaurant = restaurantsCompleteData.find((r) => r.id === id);
      if (restaurant) {
        return HttpResponse.json([restaurant]);
      }
      return HttpResponse.json([], { status: 404 });
    }

    if (category) {
      // Return restaurants by category
      const filtered = restaurantsCompleteData.filter((r) =>
        r.categories?.includes(category)
      );
      return HttpResponse.json(filtered);
    }

    // Return all restaurants
    return HttpResponse.json(restaurantsCompleteData);
  }),
];
