import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'comfort-food'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'Classic with melted cheddar', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Vanilla or chocolate', price: 5.99 },
      ],
      drinks: [
        { id: 5, name: 'Soda', description: 'Cola, Sprite or Fanta', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Express',
    specialty: 'Fresh sushi and Japanese cuisine',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'asian'],
    menu: {
      food: [
        { id: 6, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 7, name: 'Tuna Nigiri', description: 'Hand-pressed tuna sushi', price: 14.99 },
      ],
      dessert: [
        { id: 8, name: 'Mochi', description: 'Green tea flavored', price: 4.99 },
      ],
      drinks: [
        { id: 9, name: 'Green Tea', description: 'Hot or iced', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    specialty: 'Wood-fired pizzas and Italian classics',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    isClosed: true,
    isNew: false,
    categories: ['pizza'],
    menu: {
      food: [
        { id: 10, name: 'Margherita', description: 'Tomato, mozzarella and basil', price: 11.99 },
      ],
      dessert: [
        { id: 11, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99 },
      ],
      drinks: [
        { id: 12, name: 'Espresso', description: 'Double shot', price: 3.49 },
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
        const filtered = restaurants.filter((r) => r.categories?.includes(category))
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(restaurants)
    }),
  ],
}
