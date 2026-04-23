import { http, HttpResponse } from 'msw';
import { Restaurant } from '../src/types';

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Grill House',
    specialty: 'BBQ & Grilled Meats',
    photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561241?w=500&h=300&fit=crop',
    rating: 4.5,
    categories: ['BBQ', 'American'],
    menu: {
      food: [
        { id: 1, name: 'Grilled Steak', price: 25, description: 'Premium grilled steak' },
        { id: 2, name: 'BBQ Ribs', price: 20, description: 'Slow-smoked ribs' },
      ],
      dessert: [
        { id: 3, name: 'Chocolate Cake', price: 8 },
      ],
      drinks: [
        { id: 4, name: 'Iced Tea', price: 3 },
      ],
    },
  },
  {
    id: '2',
    name: 'Pasta Perfetto',
    specialty: 'Italian Cuisine',
    photoUrl: 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=500&h=300&fit=crop',
    rating: 4.8,
    categories: ['Italian', 'Pasta'],
    menu: {
      food: [
        { id: 5, name: 'Spaghetti Carbonara', price: 18, description: 'Classic carbonara' },
        { id: 6, name: 'Risotto Milano', price: 16 },
      ],
      dessert: [
        { id: 7, name: 'Tiramisu', price: 7 },
      ],
      drinks: [
        { id: 8, name: 'Red Wine', price: 8 },
      ],
    },
  },
  {
    id: '3',
    name: 'Sushi Paradise',
    specialty: 'Japanese Cuisine',
    photoUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
    rating: 4.7,
    isNew: true,
    categories: ['Sushi', 'Japanese'],
    menu: {
      food: [
        { id: 9, name: 'California Roll', price: 12 },
        { id: 10, name: 'Spicy Tuna Roll', price: 14 },
      ],
      dessert: [
        { id: 11, name: 'Mango Ice Cream', price: 6 },
      ],
      drinks: [
        { id: 12, name: 'Sake', price: 10 },
      ],
    },
  },
  {
    id: '4',
    name: 'Burger Junction',
    specialty: 'Gourmet Burgers',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    rating: 4.3,
    isClosed: true,
    categories: ['Burgers', 'Fast Food'],
    menu: {
      food: [
        { id: 13, name: 'Classic Burger', price: 10 },
        { id: 14, name: 'Cheese Burger', price: 11 },
      ],
      dessert: [
        { id: 15, name: 'Milkshake', price: 6 },
      ],
      drinks: [
        { id: 16, name: 'Coke', price: 2 },
      ],
    },
  },
];

export const mswHandlers = [
  http.get('https://mealdrop.netlify.app/.netlify/functions/restaurants', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const category = url.searchParams.get('category');

    if (id) {
      const restaurant = mockRestaurants.find(r => r.id === id);
      return restaurant ? HttpResponse.json(restaurant) : HttpResponse.json(null, { status: 404 });
    }

    if (category) {
      const filtered = mockRestaurants.filter(r =>
        r.categories?.some(c => c.toLowerCase() === category.toLowerCase())
      );
      return HttpResponse.json(filtered);
    }

    return HttpResponse.json(mockRestaurants);
  }),
];
