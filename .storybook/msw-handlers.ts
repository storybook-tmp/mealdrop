import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers with locally sourced ingredients',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With aged cheddar', price: 11.99 },
      ],
      dessert: [
        { id: 3, name: 'Brownie', description: 'Chocolate brownie', price: 5.99 },
      ],
      drinks: [
        { id: 4, name: 'Milkshake', description: 'Vanilla milkshake', price: 4.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    specialty: 'Authentic Japanese sushi and ramen',
    photoUrl:
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 5, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 6, name: 'Tuna Sashimi', description: 'Thinly sliced tuna', price: 14.99 },
      ],
      dessert: [
        { id: 7, name: 'Mochi', description: 'Green tea ice cream mochi', price: 6.99 },
      ],
      drinks: [
        { id: 8, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 2.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    specialty: 'Wood-fired Neapolitan pizzas',
    photoUrl:
      'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.2,
    categories: ['pizza'],
    isClosed: true,
    isNew: false,
    menu: {
      food: [
        { id: 9, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 10.99 },
      ],
      dessert: [
        { id: 10, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 11, name: 'Espresso', description: 'Double shot', price: 3.99 },
      ],
    },
  },
];

export const mswHandlers = [
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
];
