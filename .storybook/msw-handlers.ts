import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const sampleRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Juicy burgers with fresh ingredients and homemade sauces',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['burgers', 'comfort-food'],
    isNew: true,
    rating: 4.5,
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
    name: 'Sushi World',
    specialty: 'Authentic Japanese sushi and ramen dishes',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    categories: ['sushi', 'asian'],
    isNew: false,
    rating: 4.8,
    menu: {
      food: [
        { id: 5, name: 'Salmon Roll', description: 'Fresh salmon roll', price: 12.99 },
        { id: 6, name: 'Tuna Sashimi', description: 'Premium tuna', price: 15.99 },
      ],
      dessert: [
        { id: 7, name: 'Mochi', description: 'Rice cake dessert', price: 4.99 },
      ],
      drinks: [
        { id: 8, name: 'Green Tea', description: 'Hot green tea', price: 2.49 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    specialty: 'Wood-fired Italian pizzas made with love',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    categories: ['pizza'],
    isNew: false,
    rating: 3.8,
    menu: {
      food: [
        { id: 9, name: 'Margherita', description: 'Classic margherita', price: 10.99 },
      ],
      dessert: [
        { id: 10, name: 'Tiramisu', description: 'Coffee-flavoured dessert', price: 6.99 },
      ],
      drinks: [
        { id: 11, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.49 },
      ],
    },
  },
]

export const mswHandlers = {
  default: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url)
      const id = url.searchParams.get('id')
      const category = url.searchParams.get('category')

      if (id) {
        const restaurant = sampleRestaurants.find((r) => r.id === id)
        if (!restaurant) {
          return new HttpResponse(null, { status: 404 })
        }
        return HttpResponse.json(restaurant)
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
