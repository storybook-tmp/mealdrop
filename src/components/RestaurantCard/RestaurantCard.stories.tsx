import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn } from 'storybook/test'

import { restaurantsCompleteData } from '../../stub/restaurants'

import { RestaurantCard } from './RestaurantCard'

const meta = {
  component: RestaurantCard,
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <div style={{ margin: '3rem auto', maxWidth: '420px' }}>
      <RestaurantCard {...args} />
    </div>
  ),
} satisfies Meta<typeof RestaurantCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...restaurantsCompleteData[0],
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible()
    await expect(canvas.getByText(/^burgers$/i)).toBeVisible()

    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const NewRestaurant: Story = {
  args: {
    ...restaurantsCompleteData[4],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/new/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /ciao bella/i })).toBeVisible()
    await expect(canvas.getByText(/takeaway lasagna/i)).toBeVisible()
  },
}

export const Closed: Story = {
  args: {
    ...restaurantsCompleteData[2],
  },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /de oliewinkel/i })).toBeVisible()

    await userEvent.click(canvas.getByTestId('restaurant-card'))
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
