import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor } from 'storybook/test'

import { cartItems } from '../../stub/cart-items'

import { CheckoutPage } from './CheckoutPage'

const meta = {
  component: CheckoutPage,
  parameters: {
    app: {
      preloadedState: {
        cart: {
          items: cartItems.slice(0, 2),
        },
      },
      route: {
        initialEntry: '/checkout',
        path: '/checkout',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CheckoutPage>

export default meta

type Story = StoryObj<typeof meta>
type PlayContext = Parameters<NonNullable<Story['play']>>[0]

const fillContactDetails = async (canvas: PlayContext['canvas'], userEvent: PlayContext['userEvent']) => {
  await userEvent.type(canvas.getByLabelText(/first name/i), 'John')
  await userEvent.type(canvas.getByLabelText(/last name/i), 'Doe')
  await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com')
  await userEvent.type(canvas.getByLabelText(/phone number/i), '0612345678')
}

const fillDeliveryDetails = async (canvas: PlayContext['canvas'], userEvent: PlayContext['userEvent']) => {
  await userEvent.type(canvas.getByLabelText(/streetname and housenumber/i), 'Main street 13')
  await userEvent.type(canvas.getByLabelText(/postcode/i), '1234AB')
  await userEvent.type(canvas.getByLabelText(/city/i), 'Amsterdam')
}

export const Default: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /checkout/i })).toBeVisible()
    await expect(canvas.getByText(/step 1 of 2/i)).toBeVisible()
    await expect(canvas.getByLabelText(/first name/i)).toBeVisible()
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}

export const AdvanceToDeliveryDetails: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await fillContactDetails(canvas, userEvent)
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await waitFor(async () => {
      await expect(canvas.getByText(/step 2 of 2/i)).toBeVisible()
    })
    await expect(canvas.getByLabelText(/streetname and housenumber/i)).toBeVisible()
    await expect(canvas.getByRole('button', { name: /complete order/i })).toBeVisible()
  },
}

export const CompleteOrder: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas, userEvent }) => {
    await fillContactDetails(canvas, userEvent)
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    await waitFor(async () => {
      await expect(canvas.getByLabelText(/streetname and housenumber/i)).toBeVisible()
    })

    await fillDeliveryDetails(canvas, userEvent)
    await userEvent.click(canvas.getByRole('button', { name: /complete order/i }))

    await waitFor(async () => {
      await expect(canvas.getByRole('heading', { name: /order confirmed!/i })).toBeVisible()
    })
    await expect(canvas.getByText('Cheeseburger')).toBeVisible()
  },
}
