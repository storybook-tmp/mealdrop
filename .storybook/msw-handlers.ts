import { HttpResponse, http } from 'msw';

import { BASE_URL } from '../src/api';
import { restaurantsCompleteData } from '../src/stub/restaurants';

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    if (id != null) {
      if (id === 'error') {
        return new HttpResponse(null, {
          status: 500,
        });
      }

      const restaurant = restaurantsCompleteData.find((item) => item.id === id);

      if (!restaurant) {
        return new HttpResponse(null, {
          status: 404,
        });
      }

      return HttpResponse.json(restaurant);
    }

    if (category) {
      const restaurants = restaurantsCompleteData
        .filter((restaurant) => restaurant.categories?.includes(category.toLowerCase()))
        .sort((restaurant) => (restaurant.isClosed ? 1 : -1))
        .sort((restaurant) => (restaurant.isNew ? -1 : 1));

      return HttpResponse.json(restaurants);
    }

    return HttpResponse.json(restaurantsCompleteData);
  }),
];
