import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const restaurants = [
  {
    id: '1',
    name: 'Burger Paradise',
    specialty: 'Gourmet burgers with fresh ingredients',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'comfort-food'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With extra cheddar', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Brownie', description: 'Chocolate brownie with ice cream', price: 6.99 },
      ],
      drinks: [
        { id: 5, name: 'Milkshake', description: 'Vanilla milkshake', price: 4.99 },
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
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'asian'],
    menu: {
      food: [
        { id: 6, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 7, name: 'Tuna Sashimi', description: 'Sliced raw tuna', price: 14.99 },
      ],
      dessert: [
        { id: 8, name: 'Mochi', description: 'Green tea mochi', price: 5.99 },
      ],
      drinks: [
        { id: 9, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Palace',
    specialty: 'Wood-fired Neapolitan pizza',
    photoUrl:
      'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.2,
    isClosed: true,
    isNew: false,
    categories: ['pizza'],
    menu: {
      food: [
        { id: 10, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 11.99 },
        { id: 11, name: 'Pepperoni', description: 'Spicy pepperoni with cheese', price: 13.99 },
      ],
      dessert: [
        { id: 12, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 13, name: 'Italian Soda', description: 'Sparkling lemon soda', price: 3.49 },
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
