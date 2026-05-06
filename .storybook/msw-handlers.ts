import { http, HttpResponse } from 'msw'

import type { Restaurant } from '../src/types'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants: Restaurant[] = [
  {
    name: 'Burger Palace',
    id: '1',
    rating: 4.5,
    specialty: 'Gourmet burgers and fries',
    photoUrl: 'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['burgers', 'comfort-food'],
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and cheese', price: 9.99 },
        { id: 2, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 11.99 },
        { id: 3, name: 'Chicken Burger', description: 'Grilled chicken with mayo', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Vanilla, chocolate, or strawberry', price: 5.99 },
        { id: 5, name: 'Brownie', description: 'Warm chocolate brownie', price: 4.99 },
      ],
      drinks: [
        { id: 6, name: 'Soda', description: 'Cola, Sprite, or Fanta', price: 2.99 },
        { id: 7, name: 'Iced Tea', description: 'Freshly brewed', price: 3.49 },
      ],
    },
  },
  {
    name: 'Sushi Master',
    id: '2',
    rating: 4.8,
    specialty: 'Traditional and fusion sushi',
    photoUrl: 'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['sushi', 'asian'],
    isNew: false,
    menu: {
      food: [
        { id: 8, name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon', price: 12.99 },
        { id: 9, name: 'Dragon Roll', description: 'Eel, avocado, cucumber', price: 14.99 },
      ],
      dessert: [
        { id: 10, name: 'Mochi', description: 'Green tea ice cream mochi', price: 6.99 },
      ],
      drinks: [
        { id: 11, name: 'Green Tea', description: 'Hot Japanese green tea', price: 2.49 },
      ],
    },
  },
  {
    name: 'Pizza Corner',
    id: '3',
    rating: 3.2,
    specialty: 'Neapolitan style pizza',
    photoUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    categories: ['pizza'],
    isNew: false,
    menu: {
      food: [
        { id: 12, name: 'Margherita', description: 'Tomato, mozzarella, basil', price: 10.99 },
        { id: 13, name: 'Pepperoni', description: 'Classic pepperoni pizza', price: 12.99 },
      ],
      dessert: [
        { id: 14, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 15, name: 'Italian Soda', description: 'Sparkling fruit soda', price: 3.99 },
      ],
    },
  },
  {
    name: 'Thai Orchid',
    id: '4',
    rating: 4.2,
    specialty: 'Authentic Thai cuisine',
    photoUrl: 'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['asian'],
    isNew: true,
    menu: {
      food: [
        { id: 16, name: 'Pad Thai', description: 'Stir-fried rice noodles', price: 11.99 },
        { id: 17, name: 'Green Curry', description: 'With coconut milk and basil', price: 13.99 },
      ],
      dessert: [
        { id: 18, name: 'Mango Sticky Rice', description: 'With coconut cream', price: 6.99 },
      ],
      drinks: [
        { id: 19, name: 'Thai Iced Tea', description: 'Sweet creamy tea', price: 3.99 },
      ],
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
      const filtered = mockRestaurants.filter((r) =>
        r.categories?.includes(category)
      )
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(mockRestaurants)
  }),
]
