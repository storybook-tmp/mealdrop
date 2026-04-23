import type { Meta, StoryObj } from '@storybook/react-vite'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Complex/RestaurantCard',
  component: RestaurantCard,
  decorators: [
    (Story) => (
      <div style={{ width: '380px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Burger Palace',
    specialty: 'The best burgers in town with fresh ingredients and homemade sauces.',
    photoUrl: 'https://placehold.co/500x200/E5F8BC/202020?text=Burger+Palace',
    rating: 4.5,
    categories: ['Burgers', 'American'],
    isNew: true,
  },
}

export const Closed: Story = {
  args: {
    name: 'Pizza Express',
    specialty: 'Authentic Italian pizza baked in a wood-fired oven.',
    photoUrl: 'https://placehold.co/500x200/B1DDE4/202020?text=Pizza+Express',
    rating: 3.8,
    categories: ['Pizza', 'Italian'],
    isClosed: true,
  },
}

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
}
