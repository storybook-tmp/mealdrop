import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../src/api';
import { restaurantsCompleteData } from '../src/stub/restaurants';

const normalizeCategory = (value: string) => value.toLowerCase().replaceAll('-', ' ');

const getRestaurantResponse = (url: URL) => {
  const id = url.searchParams.get('id');

  if (id === '404') {
    return HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 });
  }

  if (id === '500') {
    return HttpResponse.json({ message: 'Internal server error' }, { status: 500 });
  }

  if (id) {
    const restaurant = restaurantsCompleteData.find((item) => item.id === id);

    if (!restaurant) {
      return HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 });
    }

    return HttpResponse.json(restaurant);
  }

  const category = url.searchParams.get('category');

  if (category) {
    const normalizedCategory = normalizeCategory(category);
    const restaurants = restaurantsCompleteData.filter((restaurant) =>
      restaurant.categories?.some((item) => normalizeCategory(item) === normalizedCategory)
    );

    return HttpResponse.json(restaurants);
  }

  return HttpResponse.json(restaurantsCompleteData);
};

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => getRestaurantResponse(new URL(request.url))),
];
