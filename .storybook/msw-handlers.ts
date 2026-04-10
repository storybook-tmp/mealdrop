import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    if (id) {
      const restaurant = restaurantsCompleteData.find((item) => item.id === id)

      return restaurant
        ? HttpResponse.json(restaurant)
        : HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }

    if (category) {
      return HttpResponse.json(
        restaurantsCompleteData.filter((restaurant) =>
          restaurant.categories?.includes(category.toLowerCase())
        )
      )
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]
