import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and hand-cut fries made fresh daily',
    photoUrl: 'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isNew: true,
    isClosed: false,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and cheese', price: 9.99 },
        { id: 2, name: 'Bacon Burger', description: 'Beef patty with crispy bacon and cheddar', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 5.99 },
        { id: 5, name: 'Brownie', description: 'Chocolate brownie with ice cream', price: 6.99 },
      ],
      drinks: [
        { id: 6, name: 'Soda', description: 'Choice of Coke, Sprite, or Fanta', price: 2.99 },
        { id: 7, name: 'Lemonade', description: 'Fresh-squeezed lemonade', price: 3.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi World',
    specialty: 'Authentic Japanese sushi and ramen',
    photoUrl: 'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isNew: false,
    isClosed: false,
    menu: {
      food: [
        { id: 8, name: 'Salmon Nigiri', description: 'Fresh salmon over pressed rice', price: 12.99 },
        { id: 9, name: 'Dragon Roll', description: 'Eel, avocado, and cucumber roll', price: 14.99 },
      ],
      dessert: [
        { id: 10, name: 'Mochi Ice Cream', description: 'Assorted flavors', price: 7.99 },
      ],
      drinks: [
        { id: 11, name: 'Green Tea', description: 'Hot Japanese green tea', price: 2.49 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Corner',
    specialty: 'Wood-fired Neapolitan pizza with fresh ingredients',
    photoUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    categories: ['pizza', 'comfort-food'],
    isNew: false,
    isClosed: true,
    menu: {
      food: [
        { id: 12, name: 'Margherita', description: 'Classic tomato, mozzarella, and basil', price: 13.99 },
        { id: 13, name: 'Pepperoni', description: 'Pepperoni with mozzarella', price: 15.99 },
      ],
      dessert: [
        { id: 14, name: 'Tiramisu', description: 'Classic Italian tiramisu', price: 8.99 },
      ],
      drinks: [
        { id: 15, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.49 },
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
      const filtered = mockRestaurants.filter((r) => r.categories?.includes(category))
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(mockRestaurants)
  }),
]
