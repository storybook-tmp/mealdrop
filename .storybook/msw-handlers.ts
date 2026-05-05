import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants = [
  {
    id: '1',
    name: 'Pizza Paradise',
    specialty: 'Authentic wood-fired Neapolitan pizzas with fresh mozzarella and basil',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    categories: ['pizza', 'italian'],
    rating: 4.5,
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 12 },
        { id: 2, name: 'Pepperoni', description: 'Spicy pepperoni with cheese', price: 14 },
        { id: 3, name: 'Quattro Formaggi', description: 'Four cheese pizza', price: 16 },
      ],
      dessert: [
        { id: 4, name: 'Tiramisu', description: 'Classic Italian dessert', price: 8 },
        { id: 5, name: 'Panna Cotta', description: 'Creamy vanilla pudding', price: 7 },
      ],
      drinks: [
        { id: 6, name: 'Sparkling Water', description: 'San Pellegrino 750ml', price: 4 },
        { id: 7, name: 'House Wine', description: 'Red or white, glass', price: 9 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Express',
    specialty: 'Fresh sushi and sashimi prepared by experienced chefs',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    categories: ['sushi', 'asian'],
    rating: 4.8,
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 8, name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon', price: 10 },
        { id: 9, name: 'Dragon Roll', description: 'Avocado and eel roll', price: 15 },
      ],
      dessert: [{ id: 10, name: 'Mochi', description: 'Ice cream mochi', price: 6 }],
      drinks: [{ id: 11, name: 'Green Tea', description: 'Hot Japanese green tea', price: 3 }],
    },
  },
  {
    id: '3',
    name: 'Burger Barn',
    specialty: 'Juicy gourmet burgers with hand-cut fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    categories: ['burgers', 'comfort-food'],
    rating: 4.2,
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 12, name: 'Classic Burger', description: 'Beef patty with lettuce and tomato', price: 11 },
        { id: 13, name: 'Bacon Deluxe', description: 'Double patty with bacon and cheddar', price: 15 },
      ],
      dessert: [{ id: 14, name: 'Milkshake', description: 'Vanilla or chocolate', price: 6 }],
      drinks: [{ id: 15, name: 'Lemonade', description: 'Fresh-squeezed lemonade', price: 4 }],
    },
  },
  {
    id: '4',
    name: 'Comfort Kitchen',
    specialty: 'Homestyle comfort food just like grandma used to make',
    photoUrl:
      'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    categories: ['comfort-food'],
    rating: 3.9,
    isClosed: true,
    isNew: false,
    menu: {
      food: [
        { id: 16, name: 'Mac & Cheese', description: 'Creamy baked mac and cheese', price: 10 },
      ],
      dessert: [{ id: 17, name: 'Apple Pie', description: 'Warm apple pie with cream', price: 7 }],
      drinks: [{ id: 18, name: 'Coffee', description: 'Freshly brewed', price: 3 }],
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
