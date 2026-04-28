import { http, HttpResponse } from 'msw';

const BASE = 'https://mealdrop.netlify.app/.netlify/functions/restaurants';

const restaurants = [
  {
    id: '1',
    name: 'Belga',
    specialty: 'Belgian cuisine with waffles and frites',
    rating: 4.5,
    photoUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
    categories: ['belgian', 'european'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 'f1', name: 'Waffle', description: 'Classic Belgian waffle', price: 8.5 },
        { id: 'f2', name: 'Frites', description: 'Crispy fries', price: 4.0 },
      ],
      dessert: [
        { id: 'd1', name: 'Chocolate mousse', price: 6.0 },
      ],
      drinks: [
        { id: 'dr1', name: 'Belgian beer', price: 5.5 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Yama',
    specialty: 'Fresh sushi and Japanese dishes',
    rating: 4.8,
    photoUrl:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    categories: ['japanese', 'sushi'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 'f3', name: 'Salmon roll', price: 12.0 },
        { id: 'f4', name: 'Miso soup', price: 3.5 },
      ],
      dessert: [],
      drinks: [{ id: 'dr2', name: 'Green tea', price: 2.5 }],
    },
  },
];

export const mswHandlers = {
  restaurants: [
    http.get(BASE, ({ request }) => {
      const url = new URL(request.url);
      const id = url.searchParams.get('id');
      const category = url.searchParams.get('category');

      if (id) {
        const found = restaurants.find((r) => r.id === id);
        return found
          ? HttpResponse.json(found)
          : HttpResponse.json({ error: 'Not found' }, { status: 404 });
      }

      if (category) {
        return HttpResponse.json(
          restaurants.filter((r) => r.categories.includes(category))
        );
      }

      return HttpResponse.json(restaurants);
    }),
  ],
};
