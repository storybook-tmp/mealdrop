import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

export const mswHandlers = {
  restaurants: [
    http.get(BASE_URL, ({ request }) => {
      const url = new URL(request.url)
      const restaurantId = url.searchParams.get('id')
      const category = url.searchParams.get('category')

      if (restaurantId === '500') {
        return HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
      }

      if (restaurantId) {
        const restaurant = restaurantsCompleteData.find(({ id }) => id === restaurantId)

        if (!restaurant) {
          return HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
        }

        return HttpResponse.json(restaurant)
      }

      if (category) {
        const restaurants = restaurantsCompleteData.filter(({ categories }) =>
          categories?.includes(category)
        )

        return HttpResponse.json(restaurants)
      }

      return HttpResponse.json(restaurantsCompleteData)
    }),
  ],
}
