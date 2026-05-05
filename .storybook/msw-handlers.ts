import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const mockRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and fries',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'american'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Brownie', description: 'Chocolate brownie', price: 5.99 },
        { id: 5, name: 'Ice Cream', description: 'Vanilla ice cream', price: 4.99 },
      ],
      drinks: [
        { id: 6, name: 'Cola', description: 'Refreshing cola', price: 2.99 },
        { id: 7, name: 'Lemonade', description: 'Fresh lemonade', price: 3.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    specialty: 'Traditional Japanese sushi and ramen',
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    rating: 4.8,
    isClosed: false,
    isNew: false,
    categories: ['japanese', 'sushi'],
    menu: {
      food: [
        { id: 8, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 9, name: 'Tuna Nigiri', description: 'Premium tuna', price: 14.99 },
      ],
      dessert: [
        { id: 10, name: 'Mochi', description: 'Green tea mochi', price: 6.99 },
      ],
      drinks: [
        { id: 11, name: 'Green Tea', description: 'Traditional matcha', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Roma',
    specialty: 'Authentic Italian pizza and pasta',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    rating: 4.2,
    isClosed: true,
    isNew: false,
    categories: ['italian', 'pizza'],
    menu: {
      food: [
        { id: 12, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 11.99 },
        { id: 13, name: 'Pepperoni', description: 'Spicy pepperoni pizza', price: 13.99 },
      ],
      dessert: [
        { id: 14, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 15, name: 'Espresso', description: 'Double shot espresso', price: 2.99 },
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
      const restaurant = mockRestaurants.find((r) => r.id === id);
      if (restaurant) {
        return HttpResponse.json(restaurant);
      }
      return new HttpResponse(null, { status: 404 });
    }

    if (category) {
      const filtered = mockRestaurants.filter((r) =>
        r.categories?.includes(category)
      );
      return HttpResponse.json(filtered);
    }

    return HttpResponse.json(mockRestaurants);
  }),
];
