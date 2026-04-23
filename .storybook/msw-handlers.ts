import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../src/api';
import { restaurantsCompleteData } from '../src/stub/restaurants';

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url);
    const restaurantId = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    if (restaurantId === '500') {
      return HttpResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }

    if (restaurantId) {
      const restaurant = restaurantsCompleteData.find((item) => item.id === restaurantId);

      if (!restaurant) {
        return HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 });
      }

      return HttpResponse.json(restaurant);
    }

    if (category) {
      return HttpResponse.json(
        restaurantsCompleteData.filter((restaurant) => restaurant.categories?.includes(category))
      );
    }

    return HttpResponse.json(restaurantsCompleteData);
  }),
];
