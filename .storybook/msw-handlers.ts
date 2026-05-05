import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Burger Kingdom',
    specialty: 'Juicy burgers and crispy fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 9.99 },
        { id: 2, name: 'Cheese Burger', description: 'With melted cheddar', price: 11.99 },
        { id: 3, name: 'Bacon Burger', description: 'Topped with crispy bacon', price: 12.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 5.99 },
      ],
      drinks: [
        { id: 5, name: 'Cola', description: 'Refreshing cola', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Pizza Palace',
    specialty: 'Authentic wood-fired pizzas',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    categories: ['pizza'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 6, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 12.99 },
        { id: 7, name: 'Pepperoni', description: 'Loaded with pepperoni', price: 14.99 },
      ],
      dessert: [
        { id: 8, name: 'Tiramisu', description: 'Italian coffee dessert', price: 7.99 },
      ],
      drinks: [
        { id: 9, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Sushi Express',
    specialty: 'Fresh sushi and sashimi daily',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isClosed: true,
    isNew: false,
    menu: {
      food: [
        { id: 10, name: 'Salmon Roll', description: 'Fresh salmon maki', price: 8.99 },
      ],
      dessert: [
        { id: 11, name: 'Mochi', description: 'Green tea mochi ice cream', price: 4.99 },
      ],
      drinks: [
        { id: 12, name: 'Green Tea', description: 'Japanese matcha', price: 3.49 },
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
