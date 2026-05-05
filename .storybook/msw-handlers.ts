import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'American classics and burgers',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.5,
    categories: ['burgers', 'american'],
    isNew: true,
    isClosed: false,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Vanilla or chocolate', price: 5.99 },
      ],
      drinks: [
        { id: 5, name: 'Soda', description: 'Cola, Sprite, or Fanta', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    specialty: 'Authentic Italian pizza',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.2,
    categories: ['pizza', 'italian'],
    isNew: false,
    isClosed: false,
    menu: {
      food: [
        { id: 1, name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 12.99 },
        { id: 2, name: 'Pepperoni', description: 'Classic pepperoni', price: 14.99 },
      ],
      dessert: [
        { id: 3, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 4, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Sushi World',
    specialty: 'Fresh Japanese sushi and ramen',
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    rating: 4.8,
    categories: ['sushi', 'japanese'],
    isNew: false,
    isClosed: true,
    menu: {
      food: [
        { id: 1, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 14.99 },
        { id: 2, name: 'Tuna Nigiri', description: 'Bluefin tuna', price: 16.99 },
      ],
      dessert: [
        { id: 3, name: 'Mochi', description: 'Green tea flavored', price: 6.99 },
      ],
      drinks: [
        { id: 4, name: 'Green Tea', description: 'Hot or iced', price: 3.49 },
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
