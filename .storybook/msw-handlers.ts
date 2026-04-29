import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const sampleRestaurant = {
  id: '1',
  name: 'Burger Palace',
  specialty: 'Gourmet burgers with locally sourced ingredients',
  photoUrl:
    'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.5,
  isClosed: false,
  isNew: true,
  categories: ['burgers', 'comfort-food'],
  menu: {
    food: [
      { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and cheese', price: 9.99 },
      { id: 2, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 11.99 },
      { id: 3, name: 'Chicken Burger', description: 'Grilled chicken with special sauce', price: 10.99 },
    ],
    dessert: [
      { id: 4, name: 'Brownie', description: 'Chocolate brownie with ice cream', price: 5.99 },
    ],
    drinks: [
      { id: 5, name: 'Milkshake', description: 'Vanilla milkshake', price: 4.99 },
    ],
  },
}

const sampleRestaurant2 = {
  id: '2',
  name: 'Pizza Heaven',
  specialty: 'Authentic Italian pizza baked in a wood-fired oven',
  photoUrl:
    'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 4.2,
  isClosed: false,
  isNew: false,
  categories: ['pizza'],
  menu: {
    food: [
      { id: 6, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 12.99 },
      { id: 7, name: 'Pepperoni', description: 'Pepperoni with extra cheese', price: 14.99 },
    ],
    dessert: [
      { id: 8, name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99 },
    ],
    drinks: [
      { id: 9, name: 'Espresso', description: 'Italian espresso', price: 2.99 },
    ],
  },
}

const closedRestaurant = {
  id: '3',
  name: 'Sushi Express',
  specialty: 'Fresh sushi and Japanese cuisine',
  photoUrl:
    'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
  rating: 3.8,
  isClosed: true,
  isNew: false,
  categories: ['sushi', 'asian'],
  menu: {
    food: [
      { id: 10, name: 'California Roll', description: 'Crab, avocado, cucumber', price: 8.99 },
    ],
    dessert: [],
    drinks: [
      { id: 11, name: 'Green Tea', description: 'Japanese green tea', price: 1.99 },
    ],
  },
}

const allRestaurants = [sampleRestaurant, sampleRestaurant2, closedRestaurant]

export const mswHandlers = {
  restaurants: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url)
      const id = url.searchParams.get('id')
      const category = url.searchParams.get('category')

      if (id) {
        const restaurant = allRestaurants.find((r) => r.id === id)
        if (!restaurant) {
          return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json(restaurant)
      }

      if (category) {
        const filtered = allRestaurants.filter((r) =>
          r.categories?.includes(category)
        )
        return HttpResponse.json(filtered)
      }

      return HttpResponse.json(allRestaurants)
    }),
  ],
}
