import { http, HttpResponse } from 'msw'

import { Restaurant } from '../src/types'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Burgers, Fries, Shakes',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    isClosed: false,
    isNew: true,
    categories: ['burgers', 'comfort-food'],
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With cheddar cheese', price: 11.99 },
        { id: 3, name: 'Bacon Burger', description: 'Topped with crispy bacon', price: 13.99 },
      ],
      dessert: [
        { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 6.99 },
        { id: 5, name: 'Ice Cream Sundae', description: 'Vanilla with toppings', price: 5.99 },
      ],
      drinks: [
        { id: 6, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 4.99 },
        { id: 7, name: 'Soda', description: 'Refreshing cola', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    specialty: 'Sushi, Sashimi, Japanese cuisine',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'asian'],
    menu: {
      food: [
        { id: 8, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 9, name: 'Tuna Sashimi', description: 'Thinly sliced tuna', price: 14.99 },
      ],
      dessert: [{ id: 10, name: 'Mochi', description: 'Rice cake with ice cream', price: 5.99 }],
      drinks: [{ id: 11, name: 'Green Tea', description: 'Traditional matcha', price: 3.99 }],
    },
  },
  {
    id: '3',
    name: 'Pizza Express',
    specialty: 'Wood-fired pizzas and Italian classics',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    isClosed: true,
    isNew: false,
    categories: ['pizza'],
    menu: {
      food: [
        { id: 12, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 10.99 },
        { id: 13, name: 'Pepperoni', description: 'Loaded with pepperoni', price: 12.99 },
      ],
      dessert: [{ id: 14, name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: 7.99 }],
      drinks: [{ id: 15, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.49 }],
    },
  },
]

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    if (id) {
      const restaurant = mockRestaurants.find((r) => r.id === id)
      if (restaurant) {
        return HttpResponse.json(restaurant)
      }
      return new HttpResponse(null, { status: 404 })
    }

    if (category) {
      const filtered = mockRestaurants.filter((r) => r.categories?.includes(category))
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(mockRestaurants)
  }),
]
