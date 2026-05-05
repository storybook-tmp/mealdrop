import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5 },
        { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5 },
      ],
      dessert: [{ id: 3, name: 'Vanilla ice cream', description: 'Ice cream', price: 2 }],
      drinks: [
        { id: 4, name: 'Coca-Cola', price: 1.75 },
        { id: 5, name: 'Fanta', price: 1.5 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Place',
    specialty: 'Best sushi in town',
    photoUrl:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.7,
    categories: ['sushi', 'asian'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [{ id: 7, name: 'Salmon Roll', description: 'Fresh salmon roll', price: 12 }],
      dessert: [{ id: 8, name: 'Mochi', description: 'Japanese rice cake', price: 4 }],
      drinks: [{ id: 9, name: 'Green Tea', price: 2 }],
    },
  },
  {
    id: '3',
    name: 'Pizza Palace',
    specialty: 'Authentic Italian pizza',
    photoUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.5,
    categories: ['pizza', 'comfort food'],
    isClosed: true,
    isNew: false,
    menu: {
      food: [{ id: 10, name: 'Margherita', description: 'Classic margherita', price: 10 }],
      dessert: [{ id: 11, name: 'Tiramisu', description: 'Italian dessert', price: 5 }],
      drinks: [{ id: 12, name: 'Espresso', price: 2.5 }],
    },
  },
]

export const mswHandlers = {
  restaurants: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url)
      const id = url.searchParams.get('id')
      const category = url.searchParams.get('category')

      if (id) {
        const restaurant = restaurants.find((r) => r.id === id)
        if (!restaurant) {
          return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json(restaurant)
      }

      if (category) {
        const filtered = restaurants.filter((r) => r.categories?.includes(category))
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(restaurants)
    }),
  ],
}
