import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import restaurantPhoto from '../../assets/images/restaurants.png'

import { RestaurantCard } from './RestaurantCard'

const meta = preview.meta({
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  args: {
    categories: ['Sushi', 'Japanese'],
    name: 'Tokyo Table',
    onClick: fn(),
    photoUrl: restaurantPhoto,
    rating: 4.8,
    specialty: 'Fresh sushi rolls, ramen, and late-night comfort food.',
  },
})

export const Featured = meta.story({
  args: {
    isNew: true,
  },
})

export const Closed = meta.story({
  args: {
    isClosed: true,
  },
})
