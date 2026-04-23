import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

const getRestaurantResponse = (requestUrl: string) => {
  const url = new URL(requestUrl)
  const category = url.searchParams.get('category')
  const id = url.searchParams.get('id')

  if (id) {
    const restaurant = restaurantsCompleteData.find((entry) => entry.id === id)
    return restaurant
      ? HttpResponse.json(restaurant)
      : HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
  }

  if (category) {
    const restaurants = restaurantsCompleteData.filter((entry) => entry.categories?.includes(category))
    return HttpResponse.json(restaurants)
  }

  return HttpResponse.json(restaurantsCompleteData)
}

export const mswHandlers = {
  restaurants: [http.get(BASE_URL, ({ request }) => getRestaurantResponse(request.url))],
}
