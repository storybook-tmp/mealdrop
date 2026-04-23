import { config } from '../../../.storybook/preview'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const [featuredRestaurant, closedRestaurant] = restaurantsCompleteData

const meta = config.meta({
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    name: featuredRestaurant.name,
    specialty: featuredRestaurant.specialty,
    rating: featuredRestaurant.rating,
    photoUrl: featuredRestaurant.photoUrl,
    categories: featuredRestaurant.categories,
    isNew: true,
  },
})

export const Default = meta.story()

export const Closed = meta.story({
  args: {
    name: closedRestaurant.name,
    specialty: closedRestaurant.specialty,
    rating: closedRestaurant.rating,
    photoUrl: closedRestaurant.photoUrl,
    categories: closedRestaurant.categories,
    isClosed: true,
  },
})
