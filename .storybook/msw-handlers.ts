import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const sampleRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: 4.5,
    specialty: 'Juicy burgers and crispy fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['burgers', 'comfort-food'],
    isNew: true,
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
    name: 'Sushi Express',
    rating: 4.8,
    specialty: 'Fresh sushi and sashimi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['sushi', 'asian'],
    isNew: false,
    menu: {
      food: [
        { id: 5, name: 'Salmon Roll', description: 'Fresh salmon roll', price: 12.99 },
      ],
      dessert: [
        { id: 6, name: 'Mochi', description: 'Green tea mochi', price: 4.99 },
      ],
      drinks: [
        { id: 7, name: 'Green Tea', description: 'Hot green tea', price: 1.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    rating: 3.8,
    specialty: 'Authentic Italian pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    categories: ['pizza'],
    isNew: false,
    menu: {
      food: [
        { id: 8, name: 'Margherita', description: 'Classic margherita', price: 10.99 },
      ],
      dessert: [
        { id: 9, name: 'Tiramisu', description: 'Classic tiramisu', price: 6.99 },
      ],
      drinks: [
        { id: 10, name: 'Espresso', description: 'Italian espresso', price: 2.49 },
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
        const restaurant = sampleRestaurants.find((r) => r.id === id)
        if (restaurant) {
          return HttpResponse.json(restaurant)
        }
        return new HttpResponse(null, { status: 404 })
      }

      if (category) {
        const filtered = sampleRestaurants.filter((r) =>
          r.categories?.includes(category)
        )
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(sampleRestaurants)
    }),
  ],
}
