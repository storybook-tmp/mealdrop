import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeaderComponent } from './Header'

const meta = {
  title: 'AI Generated/Medium/HeaderComponent',
  component: HeaderComponent,
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isCartVisible: false,
    cartItems: [],
    totalPrice: 0,
    logoOnly: false,
    sticky: false,
  },
}

export const WithCartTotal: Story = {
  args: {
    isCartVisible: false,
    cartItems: [
      {
        id: '1',
        name: 'Burger',
        price: 12.99,
        quantity: 2,
        categoryId: 'cat1',
        restaurantId: 'rest1',
      },
    ],
    totalPrice: 25.98,
    logoOnly: false,
    sticky: true,
  },
}

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
}
