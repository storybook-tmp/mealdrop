import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

const sortCategoryRestaurants = (restaurants: typeof restaurantsCompleteData) =>
  restaurants
    .toSorted((restaurant) => (restaurant.isClosed ? 1 : -1))
    .toSorted((restaurant) => (restaurant.isNew ? -1 : 1))

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const restaurantId = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    if (restaurantId) {
      const restaurant = restaurantsCompleteData.find((item) => item.id === restaurantId)

      if (!restaurant) {
        return HttpResponse.json(null, { status: 404 })
      }

      return HttpResponse.json(restaurant)
    }

    if (category) {
      const restaurants = restaurantsCompleteData.filter((restaurant) =>
        restaurant.categories?.includes(category.toLowerCase())
      )

      return HttpResponse.json(sortCategoryRestaurants(restaurants))
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]
