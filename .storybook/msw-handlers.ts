import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const sampleRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: 4.5,
    specialty: 'Gourmet burgers and fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'comfort-food'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 11.99 },
      ],
      dessert: [
        { id: 3, name: 'Brownie', description: 'Chocolate brownie', price: 5.99 },
      ],
      drinks: [
        { id: 4, name: 'Cola', description: 'Refreshing cola', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    rating: 4.8,
    specialty: 'Fresh sushi and sashimi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'asian'],
    menu: {
      food: [
        { id: 5, name: 'Salmon Roll', description: 'Fresh salmon roll', price: 12.99 },
        { id: 6, name: 'Tuna Sashimi', description: 'Sliced raw tuna', price: 14.99 },
      ],
      dessert: [
        { id: 7, name: 'Mochi', description: 'Rice cake dessert', price: 4.99 },
      ],
      drinks: [
        { id: 8, name: 'Green Tea', description: 'Japanese green tea', price: 3.49 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Roma',
    rating: 4.2,
    specialty: 'Authentic Italian pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    isNew: false,
    categories: ['pizza'],
    menu: {
      food: [
        { id: 9, name: 'Margherita', description: 'Classic margherita pizza', price: 10.99 },
      ],
      dessert: [
        { id: 10, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99 },
      ],
      drinks: [
        { id: 11, name: 'Espresso', description: 'Italian espresso', price: 2.49 },
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
      const restaurant = sampleRestaurants.find((r) => r.id === id);
      if (restaurant) {
        return HttpResponse.json(restaurant);
      }
      return new HttpResponse(null, { status: 404 });
    }

    if (category) {
      const filtered = sampleRestaurants.filter((r) =>
        r.categories?.includes(category)
      );
      return HttpResponse.json(filtered);
    }

    return HttpResponse.json(sampleRestaurants);
  }),
];
