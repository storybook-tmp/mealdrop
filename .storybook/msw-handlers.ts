import { http, HttpResponse } from 'msw'

import { Restaurant } from '../src/types'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Saigon Bistro',
    specialty: 'Vietnamese-inspired dishes with a French twist',
    photoUrl:
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    categories: ['asian', 'comfort-food'],
    isClosed: false,
    isNew: true,
    rating: 4.5,
    menu: {
      food: [
        { id: 1, name: 'Spring Rolls', description: 'Fresh vegetable spring rolls', price: 6.5 },
        { id: 2, name: 'Pho Soup', description: 'Traditional Vietnamese pho', price: 12.0 },
        { id: 3, name: 'Banh Mi', description: 'Crispy baguette sandwich', price: 9.0 },
      ],
      dessert: [
        { id: 4, name: 'Che Ba Mau', description: 'Three-color dessert', price: 5.0 },
      ],
      drinks: [
        { id: 5, name: 'Vietnamese Coffee', description: 'Strong drip coffee with condensed milk', price: 4.0 },
      ],
    },
  },
  {
    id: '2',
    name: 'Pizza Palace',
    specialty: 'Authentic Neapolitan pizza baked in a wood-fired oven',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    categories: ['pizza'],
    isClosed: false,
    isNew: false,
    rating: 4.2,
    menu: {
      food: [
        { id: 6, name: 'Margherita', description: 'Classic tomato, mozzarella, basil', price: 11.0 },
        { id: 7, name: 'Pepperoni', description: 'Spicy pepperoni with mozzarella', price: 13.0 },
      ],
      dessert: [
        { id: 8, name: 'Tiramisu', description: 'Classic Italian tiramisu', price: 7.0 },
      ],
      drinks: [
        { id: 9, name: 'Limoncello Spritz', description: 'Refreshing lemon cocktail', price: 8.0 },
      ],
    },
  },
  {
    id: '3',
    name: 'Burger Barn',
    specialty: 'Gourmet burgers made from locally sourced beef',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    categories: ['burgers'],
    isClosed: true,
    isNew: false,
    rating: 3.8,
    menu: {
      food: [
        { id: 10, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 10.0 },
        { id: 11, name: 'Cheese Burger', description: 'With double cheddar', price: 12.0 },
      ],
      dessert: [
        { id: 12, name: 'Brownie', description: 'Warm chocolate brownie', price: 6.0 },
      ],
      drinks: [
        { id: 13, name: 'Milkshake', description: 'Vanilla or chocolate', price: 5.5 },
      ],
    },
  },
  {
    id: '4',
    name: 'Sushi Express',
    specialty: 'Fresh sushi and sashimi prepared daily',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=300',
    categories: ['sushi', 'asian'],
    isClosed: false,
    isNew: false,
    rating: 4.7,
    menu: {
      food: [
        { id: 14, name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon', price: 8.0 },
        { id: 15, name: 'Dragon Roll', description: 'Eel and avocado roll', price: 14.0 },
      ],
      dessert: [
        { id: 16, name: 'Mochi', description: 'Green tea ice cream mochi', price: 5.0 },
      ],
      drinks: [
        { id: 17, name: 'Sake', description: 'Warm or cold sake', price: 9.0 },
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
        const restaurant = mockRestaurants.find((r) => r.id === id)
        if (!restaurant) {
          return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json(restaurant)
      }

      if (category) {
        const filtered = mockRestaurants.filter((r) =>
          r.categories?.includes(category)
        )
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(mockRestaurants)
    }),
  ],
}
