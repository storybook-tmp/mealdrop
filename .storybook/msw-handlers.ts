import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Burger Kingdom',
    specialty: 'Original, unique and delicious burgers made with love',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, cheese', price: 9.99 },
        { id: 2, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 11.99 },
      ],
      dessert: [
        { id: 3, name: 'Brownie', description: 'Chocolate brownie', price: 5.99 },
      ],
      drinks: [
        { id: 4, name: 'Cola', description: 'Classic cola', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Palace',
    specialty: 'Fresh sushi and sashimi prepared by expert chefs',
    photoUrl:
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 1, name: 'Salmon Roll', description: 'Fresh salmon with rice', price: 12.99 },
      ],
      dessert: [
        { id: 2, name: 'Mochi', description: 'Rice cake with ice cream', price: 6.99 },
      ],
      drinks: [
        { id: 3, name: 'Green Tea', description: 'Traditional Japanese tea', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Planet',
    specialty: 'Wood-fired pizzas with homemade dough and fresh ingredients',
    photoUrl:
      'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 3.5,
    categories: ['pizza'],
    isClosed: true,
    isNew: false,
    menu: {
      food: [
        { id: 1, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 10.99 },
      ],
      dessert: [
        { id: 2, name: 'Tiramisu', description: 'Italian coffee dessert', price: 7.99 },
      ],
      drinks: [
        { id: 3, name: 'Sparkling Water', description: 'Mineral water', price: 2.49 },
      ],
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
        const filtered = restaurants.filter((r) =>
          r.categories?.includes(category)
        )
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(restaurants)
    }),
  ],
}
