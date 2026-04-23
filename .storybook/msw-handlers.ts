import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

const findRestaurantById = (id: string) => restaurantsCompleteData.find((restaurant) => restaurant.id === id)

const findRestaurantsByCategory = (category: string) =>
  restaurantsCompleteData.filter((restaurant) => restaurant.categories?.includes(category))

export const defaultMswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')

    if (id) {
      const restaurant = findRestaurantById(id)

      return restaurant
        ? HttpResponse.json(restaurant)
        : HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
    }

    if (category) {
      return HttpResponse.json(findRestaurantsByCategory(category))
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]
