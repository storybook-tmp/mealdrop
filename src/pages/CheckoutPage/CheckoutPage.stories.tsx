import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Provider as StoreProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '../../app-state/store'
import { CheckoutPage } from './CheckoutPage'

const storeWithItems = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cart: {
      visible: false,
      items: [
        { id: 1, name: 'Cheeseburger', description: 'Nice grilled burger', price: 8.5, quantity: 2 },
        { id: 2, name: 'Fries', description: 'Fried french fries', price: 2.5, quantity: 1 },
      ],
    },
    order: { items: [] },
  },
})

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CheckoutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Checkout' })).toBeVisible()
    await expect(canvas.getByText('Contact details')).toBeVisible()
  },
}

export const WithCartItems: Story = {
  render: () => (
    <StoreProvider store={storeWithItems}>
      <CheckoutPage />
    </StoreProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Checkout' })).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const DeliveryStep: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Contact details')).toBeVisible()
    const firstNameInput = canvas.getByLabelText(/first name/i)
    await userEvent.type(firstNameInput, 'John')
    const lastNameInput = canvas.getByLabelText(/last name/i)
    await userEvent.type(lastNameInput, 'Doe')
    const emailInput = canvas.getByLabelText(/email/i)
    await userEvent.type(emailInput, 'john@example.com')
    const phoneInput = canvas.getByLabelText(/phone/i)
    await userEvent.type(phoneInput, '0612345678')
    const nextButton = canvas.getByRole('button', { name: /next/i })
    await userEvent.click(nextButton)
    await expect(canvas.getByText('Delivery details')).toBeVisible()
  },
}
