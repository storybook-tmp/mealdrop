import { http, HttpResponse } from 'msw'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

const food = [
  { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger with cheese', price: 8.5 },
  { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5 },
]

const dessert = [{ id: 3, name: 'Vanilla ice cream', description: 'Ice cream', price: 2 }]

const drinks = [
  { id: 4, name: 'Coca-Cola', price: 1.75 },
  { id: 5, name: 'Fanta', price: 1.5 },
  { id: 6, name: 'Sprite', price: 1.5 },
]

const restaurants = [
  {
    id: '1',
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
    rating: 4.2,
    categories: ['burgers', 'comfort food'],
    menu: { food, dessert, drinks },
  },
  {
    id: '2',
    name: 'Kara Fin',
    specialty: 'Sarma (wine leafs with rice)',
    photoUrl:
      'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    categories: ['burgers', 'pizza'],
    menu: { food, dessert, drinks },
  },
  {
    id: '3',
    name: 'De Oliewinkel',
    specialty: 'Olive oil',
    photoUrl: 'https://duyt4h9nfnj50.cloudfront.net/search_home/FastFood.jpg',
    categories: ['comfort food'],
    isClosed: true,
    menu: { food, dessert, drinks },
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
      const filtered = restaurants.filter((r) => r.categories?.includes(category))
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(restaurants)
  }),
]
