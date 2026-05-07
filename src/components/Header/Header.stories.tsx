import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { HeaderComponent } from './Header';

const cartItems = [
  {
    id: 1,
    name: 'Salmon nigiri',
    description: 'Fresh salmon over rice',
    price: 8,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Miso soup',
    description: 'Tofu, wakame, and scallion',
    price: 4,
    quantity: 1,
  },
];

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyCart: Story = {
  args: {
    totalPrice: 0,
  },
};

export const WithCartTotal: Story = {
  args: {
    cartItems,
    totalPrice: 20,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /food cart/i })).toHaveTextContent(/20\.00/);
  },
};

export const CartOpen: Story = {
  args: {
    cartItems,
    isCartVisible: true,
    totalPrice: 20,
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByText('Your order')).toBeVisible();
  },
};

export const LogoOnly: Story = {
  args: {
    logoOnly: true,
  },
};
