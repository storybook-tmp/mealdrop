import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const sampleRestaurant = {
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
      { id: 2, name: 'Cheese Burger', description: 'With melted cheddar', price: 11.99 },
    ],
    dessert: [
      { id: 3, name: 'Brownie', description: 'Chocolate brownie', price: 5.99 },
    ],
    drinks: [
      { id: 4, name: 'Cola', description: 'Refreshing cola', price: 2.99 },
    ],
  },
}

const sampleRestaurant2 = {
  id: '2',
  name: 'Pizza Heaven',
  specialty: 'Wood-fired pizzas and pasta',
  photoUrl:
    'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  rating: 4.2,
  isClosed: false,
  isNew: false,
  categories: ['pizza'],
  menu: {
    food: [
      { id: 5, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 12.99 },
    ],
    dessert: [
      { id: 6, name: 'Tiramisu', description: 'Coffee-flavored dessert', price: 7.99 },
    ],
    drinks: [
      { id: 7, name: 'Sparkling Water', description: 'Mineral water', price: 1.99 },
    ],
  },
}

const restaurants = [sampleRestaurant, sampleRestaurant2]

export const mswHandlers = {
  restaurants: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url)
      const id = url.searchParams.get('id')
      const category = url.searchParams.get('category')

      if (id) {
        const restaurant = restaurants.find((r) => r.id === id)
        if (restaurant) {
          return HttpResponse.json(restaurant)
        }
        return new HttpResponse(null, { status: 404 })
      }

      if (category) {
        const filtered = restaurants.filter((r) => r.categories?.includes(category))
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(restaurants)
    }),
  ],
}
