import { http, HttpResponse } from 'msw'
import { restaurantsCompleteData } from '../src/stub/restaurants'

const BASE_URL = 'https://mealdrop.netlify.app/.netlify/functions/restaurants'

export const mswHandlers = [
  http.get(BASE_URL, ({ request }) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')

    if (id) {
      const restaurant = restaurantsCompleteData.find((r) => r.id === id)
      if (!restaurant) {
        return new HttpResponse(null, { status: 404 })
      }
      return HttpResponse.json(restaurant)
    }

    if (category) {
      const filtered = restaurantsCompleteData
        .filter((r) => r.categories?.includes(category.toLowerCase()))
        .sort((r) => (r.isClosed ? 1 : -1))
        .sort((r) => (r.isNew ? -1 : 1))
      return HttpResponse.json(filtered)
    }

    return HttpResponse.json(restaurantsCompleteData)
  }),
]
