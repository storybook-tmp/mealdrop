import type { Meta, StoryObj } from '@storybook/react-vite'

import { cartItems } from '../../stub/cart-items'

import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
} satisfies Meta<typeof SuccessPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    appState: {
      order: {
        items: cartItems,
      },
    },
    route: {
      entry: '/success',
      path: '/success',
    },
  },
  render: () => <SuccessPage />,
}
