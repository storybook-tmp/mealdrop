import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const mockRestaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    specialty: 'Gourmet burgers made with premium ingredients and fresh toppings',
    photoUrl:
      'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isNew: true,
    isClosed: false,
    menu: {
      food: [
        { id: 1, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato and cheese', price: 12.99 },
        { id: 2, name: 'Bacon Burger', description: 'Beef patty with crispy bacon and cheddar', price: 14.99 },
        { id: 3, name: 'Veggie Burger', description: 'Plant-based patty with avocado', price: 11.99 },
      ],
      dessert: [
        { id: 4, name: 'Milkshake', description: 'Creamy vanilla milkshake', price: 5.99 },
        { id: 5, name: 'Brownie', description: 'Warm chocolate brownie with ice cream', price: 6.99 },
      ],
      drinks: [
        { id: 6, name: 'Soda', description: 'Refreshing cola', price: 2.99 },
        { id: 7, name: 'Lemonade', description: 'Fresh squeezed lemonade', price: 3.99 },
      ],
    },
  },
  {
    id: '2',
    name: 'Sushi Master',
    specialty: 'Authentic Japanese sushi and sashimi prepared by master chefs',
    photoUrl:
      'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    categories: ['sushi', 'asian'],
    isNew: false,
    isClosed: false,
    menu: {
      food: [
        { id: 10, name: 'Salmon Nigiri', description: 'Fresh salmon over rice', price: 8.99 },
        { id: 11, name: 'Dragon Roll', description: 'Shrimp tempura with avocado', price: 14.99 },
        { id: 12, name: 'Tuna Sashimi', description: 'Sliced fresh tuna', price: 12.99 },
      ],
      dessert: [
        { id: 13, name: 'Mochi', description: 'Japanese rice cake with ice cream', price: 4.99 },
      ],
      drinks: [
        { id: 14, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 2.99 },
        { id: 15, name: 'Sake', description: 'Premium sake', price: 7.99 },
      ],
    },
  },
  {
    id: '3',
    name: 'Pizza Express',
    specialty: 'Wood-fired pizzas with authentic Italian flavors and fresh mozzarella',
    photoUrl:
      'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.2,
    categories: ['pizza'],
    isNew: false,
    isClosed: true,
    menu: {
      food: [
        { id: 20, name: 'Margherita', description: 'Classic tomato and mozzarella', price: 10.99 },
        { id: 21, name: 'Pepperoni', description: 'Spicy pepperoni with cheese', price: 12.99 },
      ],
      dessert: [
        { id: 22, name: 'Tiramisu', description: 'Classic Italian dessert', price: 7.99 },
      ],
      drinks: [
        { id: 23, name: 'Espresso', description: 'Strong Italian espresso', price: 3.49 },
      ],
    },
  },
  {
    id: '4',
    name: 'Thai Orchid',
    specialty: 'Traditional Thai cuisine with bold spices and aromatic herbs',
    photoUrl:
      'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    categories: ['asian'],
    isNew: true,
    isClosed: false,
    menu: {
      food: [
        { id: 30, name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp', price: 13.99 },
        { id: 31, name: 'Green Curry', description: 'Spicy green curry with chicken', price: 14.99 },
      ],
      dessert: [
        { id: 32, name: 'Mango Sticky Rice', description: 'Sweet mango with coconut sticky rice', price: 6.99 },
      ],
      drinks: [
        { id: 33, name: 'Thai Iced Tea', description: 'Sweet and creamy iced tea', price: 3.99 },
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
]
