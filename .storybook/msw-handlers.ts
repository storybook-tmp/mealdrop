import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Juicy burgers and crispy fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'comfort-food'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato', price: 8.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 9.99 },
      ],
      dessert: [
        { id: 3, name: 'Brownie', description: 'Chocolate brownie', price: 4.99 },
      ],
      drinks: [
        { id: 4, name: 'Cola', description: 'Refreshing soda', price: 1.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi World',
    specialty: 'Fresh sushi and sashimi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'asian'],
    menu: {
      food: [
        { id: 5, name: 'Salmon Roll', description: 'Fresh salmon with rice', price: 12.99 },
        { id: 6, name: 'Tuna Sashimi', description: 'Sliced raw tuna', price: 14.99 },
      ],
      dessert: [
        { id: 7, name: 'Mochi', description: 'Rice cake with filling', price: 5.99 },
      ],
      drinks: [
        { id: 8, name: 'Green Tea', description: 'Traditional Japanese tea', price: 2.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    specialty: 'Wood-fired artisan pizzas',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    isClosed: true,
    isNew: false,
    categories: ['pizza'],
    menu: {
      food: [
        { id: 9, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 10.99 },
      ],
      dessert: [
        { id: 10, name: 'Tiramisu', description: 'Italian coffee dessert', price: 6.99 },
      ],
      drinks: [
        { id: 11, name: 'Espresso', description: 'Strong Italian coffee', price: 2.49 },
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
