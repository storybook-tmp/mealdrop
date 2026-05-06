import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const restaurants = [
  {
    id: '1',
    name: 'Pizza Palace',
    specialty: 'Authentic Italian wood-fired pizzas made with fresh ingredients',
    rating: 4.5,
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    isNew: true,
    categories: ['pizza', 'italian'],
    menu: {
      food: [
        { id: 1, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 12.99 },
        { id: 2, name: 'Pepperoni', description: 'Spicy pepperoni with cheese', price: 14.99 },
        { id: 3, name: 'Quattro Formaggi', description: 'Four cheese blend', price: 15.99 },
      ],
      dessert: [
        { id: 4, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
        { id: 5, name: 'Panna Cotta', description: 'Vanilla cream dessert', price: 6.99 },
      ],
      drinks: [
        { id: 6, name: 'Sparkling Water', description: 'San Pellegrino', price: 3.99 },
        { id: 7, name: 'Espresso', description: 'Double shot', price: 2.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    specialty: 'Fresh sushi and Japanese delicacies prepared by master chefs',
    rating: 4.8,
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    isNew: false,
    categories: ['sushi', 'japanese'],
    menu: {
      food: [
        { id: 8, name: 'Salmon Nigiri', description: 'Fresh Atlantic salmon', price: 8.99 },
        { id: 9, name: 'Dragon Roll', description: 'Eel, avocado, and cucumber', price: 16.99 },
      ],
      dessert: [
        { id: 10, name: 'Mochi Ice Cream', description: 'Green tea flavor', price: 5.99 },
      ],
      drinks: [{ id: 11, name: 'Green Tea', description: 'Organic matcha', price: 3.49 }],
    },
  },
  {
    id: '3',
    name: 'Burger Barn',
    specialty: 'Gourmet burgers with locally sourced beef and fresh toppings',
    rating: 4.2,
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: true,
    isNew: false,
    categories: ['burgers', 'american'],
    menu: {
      food: [
        { id: 12, name: 'Classic Burger', description: 'Beef patty, lettuce, tomato', price: 11.99 },
        { id: 13, name: 'Cheese Burger', description: 'With cheddar cheese', price: 13.99 },
      ],
      dessert: [
        { id: 14, name: 'Brownie', description: 'Chocolate fudge brownie', price: 5.99 },
      ],
      drinks: [{ id: 15, name: 'Milkshake', description: 'Vanilla or chocolate', price: 4.99 }],
    },
  },
  {
    id: '4',
    name: 'Thai Orchid',
    specialty: 'Traditional Thai cuisine with aromatic herbs and spices',
    rating: 4.6,
    photoUrl:
      'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    isClosed: false,
    isNew: false,
    categories: ['asian', 'thai'],
    menu: {
      food: [
        { id: 16, name: 'Pad Thai', description: 'Stir-fried rice noodles', price: 13.99 },
        { id: 17, name: 'Green Curry', description: 'With coconut milk and vegetables', price: 14.99 },
      ],
      dessert: [
        { id: 18, name: 'Mango Sticky Rice', description: 'Sweet coconut rice with mango', price: 6.99 },
      ],
      drinks: [{ id: 19, name: 'Thai Iced Tea', description: 'Sweet and creamy', price: 3.99 }],
    },
  },
]

export const mswHandlers = [
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
      const filtered = restaurants.filter((r) =>
        r.categories?.some((c) => c === category)
      )
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(restaurants)
  }),
]
