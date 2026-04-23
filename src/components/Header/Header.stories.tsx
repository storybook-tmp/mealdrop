import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { HeaderComponent } from './Header'

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HeaderComponent />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'food cart' })).toBeVisible()
  },
}

export const WithCartTotal: Story = {
  render: () => (
    <HeaderComponent
      totalPrice={24.5}
      cartItems={[
        { id: 1, name: 'Cheeseburger', price: 8.5, quantity: 2 },
        { id: 2, name: 'Fries', price: 2.5, quantity: 3 },
      ]}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByText(/24[.,]50/)).toBeVisible()
  },
}

export const LogoOnly: Story = {
  render: () => <HeaderComponent logoOnly />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('link', { name: 'go to home page' })).toBeVisible()
  },
}
