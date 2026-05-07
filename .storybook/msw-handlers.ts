import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../src/api';
import type { Restaurant } from '../src/types';

const restaurants: Restaurant[] = [
  {
    id: 'sushi-circle',
    name: 'Sushi Circle',
    specialty: 'Nigiri, maki, and hand rolls',
    photoUrl: '/logo192.png',
    rating: 4.8,
    categories: ['sushi', 'japanese'],
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Salmon nigiri', description: 'Fresh salmon over rice', price: 8 },
        { id: 2, name: 'Tuna roll', description: 'Tuna and cucumber maki', price: 10 },
      ],
      dessert: [{ id: 3, name: 'Mochi', description: 'Rice cake with ice cream', price: 5 }],
      drinks: [{ id: 4, name: 'Green tea', price: 3 }],
    },
  },
  {
    id: 'pasta-yard',
    name: 'Pasta Yard',
    specialty: 'Fresh pasta and seasonal sauces',
    photoUrl: '/logo192.png',
    rating: 4.4,
    categories: ['italian', 'pasta'],
    menu: {
      food: [{ id: 5, name: 'Tagliatelle', description: 'Tomato and basil', price: 14 }],
      dessert: [{ id: 6, name: 'Tiramisu', price: 7 }],
      drinks: [{ id: 7, name: 'Sparkling water', price: 3 }],
    },
  },
  {
    id: 'closed-burger',
    name: 'Closed Burger',
    specialty: 'Smash burgers and fries',
    photoUrl: '/logo192.png',
    rating: 3.7,
    categories: ['burgers'],
    isClosed: true,
    menu: {
      food: [{ id: 8, name: 'Classic burger', price: 11 }],
      dessert: [],
      drinks: [{ id: 9, name: 'Cola', price: 3 }],
    },
  },
];

export const mswHandlers = {
  restaurants: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      const category = url.searchParams.get('category');

      if (id) {
        const restaurant = restaurants.find((item) => item.id === id);

        return restaurant
          ? HttpResponse.json(restaurant)
          : HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 });
      }

      if (category) {
        return HttpResponse.json(
          restaurants.filter((restaurant) =>
            restaurant.categories?.includes(category.toLowerCase())
          )
        );
      }

      return HttpResponse.json(restaurants);
    }),
  ],
};
