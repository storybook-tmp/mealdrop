import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isClosed: false,
    isNew: true,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Juicy beef patty with lettuce, tomato, and cheese', price: 9.99 },
        { id: 2, name: 'Bacon Burger', description: 'Classic burger with crispy bacon strips', price: 11.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', price: 10.99 },
      ],
      dessert: [
        { id: 4, name: 'Chocolate Brownie', description: 'Warm brownie with vanilla ice cream', price: 6.99 },
        { id: 5, name: 'Cheesecake', description: 'New York style cheesecake', price: 7.99 },
      ],
      drinks: [
        { id: 6, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 4.99 },
        { id: 7, name: 'Soda', description: 'Refreshing cola drink', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Express',
    specialty: 'Fresh sushi and Japanese cuisine',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isClosed: false,
    isNew: false,
    menu: {
      food: [
        { id: 8, name: 'Salmon Roll', description: 'Fresh salmon with avocado', price: 12.99 },
        { id: 9, name: 'Tuna Sashimi', description: 'Premium tuna slices', price: 14.99 },
      ],
      dessert: [
        { id: 10, name: 'Mochi', description: 'Japanese rice cake with ice cream', price: 5.99 },
      ],
      drinks: [
        { id: 11, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 3.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Heaven',
    specialty: 'Wood-fired Neapolitan pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.2,
    categories: ['pizza'],
    isClosed: true,
    isNew: false,
    menu: {
      food: [
        { id: 12, name: 'Margherita', description: 'Classic tomato, mozzarella, basil', price: 11.99 },
        { id: 13, name: 'Pepperoni', description: 'Loaded with spicy pepperoni', price: 13.99 },
      ],
      dessert: [
        { id: 14, name: 'Tiramisu', description: 'Italian coffee-flavored dessert', price: 8.99 },
      ],
      drinks: [
        { id: 15, name: 'Italian Soda', description: 'Sparkling flavored soda', price: 3.49 },
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
