import type { Meta, StoryObj } from '@storybook/react-vite'
import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
} satisfies Meta<typeof RestaurantCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Chez Panisse',
    specialty: 'California cuisine featuring locally sourced seasonal ingredients',
    photoUrl: 'https://picsum.photos/seed/restaurant/500/200',
    rating: 4,
    categories: ['American', 'Organic'],
  },
}

export const New: Story = {
  args: {
    name: 'The Green Garden',
    specialty: 'Fresh plant-based dishes and smoothies',
    photoUrl: 'https://picsum.photos/seed/garden/500/200',
    rating: 5,
    isNew: true,
    categories: ['Vegan', 'Healthy'],
  },
}

export const Closed: Story = {
  args: {
    name: 'Midnight Bistro',
    specialty: 'Classic French bistro dishes',
    photoUrl: 'https://picsum.photos/seed/bistro/500/200',
    rating: 3,
    isClosed: true,
    categories: ['French'],
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
