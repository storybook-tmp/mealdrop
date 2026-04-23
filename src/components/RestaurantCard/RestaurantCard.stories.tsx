import type { Meta, StoryObj } from '@storybook/react-vite'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  title: 'AI Generated/Medium/RestaurantCard',
  component: RestaurantCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px' }}>
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
    specialty: 'The best burgers in town with fresh ingredients',
    photoUrl: 'https://picsum.photos/500/200',
    rating: 4.5,
    categories: ['Burgers', 'American'],
    isNew: true,
  },
}

export const Closed: Story = {
  args: {
    name: 'Sushi House',
    specialty: 'Fresh sushi and Japanese cuisine',
    photoUrl: 'https://picsum.photos/500/200',
    rating: 4.8,
    isClosed: true,
    categories: ['Japanese', 'Sushi'],
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
