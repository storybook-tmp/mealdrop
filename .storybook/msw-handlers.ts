import { http, HttpResponse } from 'msw'

import { BASE_URL } from '../src/api'
import { restaurantsCompleteData } from '../src/stub/restaurants'

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const restaurantId = url.searchParams.get('id')
    const categoryId = url.searchParams.get('category')

    if (restaurantId) {
      const restaurant = getRestaurantById(restaurantId)

      return restaurant
        ? HttpResponse.json(restaurant)
        : HttpResponse.json({ message: 'Restaurant not found' }, { status: 404 })
    }

    if (categoryId) {
      return HttpResponse.json(getRestaurantsByCategory(categoryId))
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]

const getRestaurantById = (restaurantId: string) => {
  return restaurantsCompleteData.find((restaurant) => restaurant.id === restaurantId)
}

const getRestaurantsByCategory = (categoryId: string) => {
  const normalizedCategoryId = categoryId.toLowerCase().replaceAll('-', ' ')

  return restaurantsCompleteData
    .filter((restaurant) =>
      restaurant.categories?.some((category) => category === categoryId.toLowerCase() || category === normalizedCategoryId)
    )
    .sort((restaurant) => (restaurant.isClosed ? 1 : -1))
    .sort((restaurant) => (restaurant.isNew ? -1 : 1))
}
