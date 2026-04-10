import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

const getRestaurantById = (id: string) => restaurantsCompleteData.find((restaurant) => restaurant.id === id)

const getRestaurantsByCategory = (category: string) =>
  restaurantsCompleteData
    .filter((restaurant) => restaurant.categories?.includes(category.toLowerCase()))
    .sort((restaurant) => (restaurant.isClosed ? 1 : -1))
    .sort((restaurant) => (restaurant.isNew ? -1 : 1))

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    if (id === 'error') {
      return HttpResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }

    if (id) {
      const restaurant = getRestaurantById(id)
      return restaurant
        ? HttpResponse.json(restaurant)
        : HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
    }

    if (category) {
      return HttpResponse.json(getRestaurantsByCategory(category))
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]
