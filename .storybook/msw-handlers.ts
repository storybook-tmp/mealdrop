import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Juicy burgers and crispy fries',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'american'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 11.99 },
      ],
      dessert: [
        { id: 3, name: 'Milkshake', description: 'Vanilla milkshake', price: 5.99 },
      ],
      drinks: [
        { id: 4, name: 'Soda', description: 'Refreshing cola', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    specialty: 'Authentic Italian pizza baked in a wood-fired oven',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.2,
    isClosed: false,
    isNew: false,
    categories: ['pizza', 'italian'],
    menu: {
      food: [
        { id: 5, name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 12.99 },
        { id: 6, name: 'Pepperoni', description: 'Classic pepperoni pizza', price: 14.99 },
      ],
      dessert: [
        { id: 7, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 8, name: 'Espresso', description: 'Italian espresso', price: 3.99 },
      ],
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
        const restaurant = restaurants.find((r) => r.id === id);
        if (!restaurant) {
          return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json(restaurant);
      }

      if (category) {
        const filtered = restaurants.filter((r) =>
          r.categories?.includes(category)
        );
        return HttpResponse.json(filtered);
      }

      return HttpResponse.json(restaurants);
    }),
  ],
};
