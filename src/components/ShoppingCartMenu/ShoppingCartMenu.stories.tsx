import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { ShoppingCartMenu } from './ShoppingCartMenu';

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
    name: 'Green tea',
    description: 'Jasmine green tea',
    price: 3,
    quantity: 1,
  },
];

const meta = {
  component: ShoppingCartMenu,
  tags: ['ai-generated'],
  args: {
    onClose: () => {},
    onItemChange: () => {},
    onGoToCheckoutClick: () => {},
  },
} satisfies Meta<typeof ShoppingCartMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenWithItems: Story = {
  args: {
    isOpen: true,
    cartItems,
    totalPrice: 19,
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByText('Salmon nigiri')).toBeVisible();
    await expect(await body.findByRole('button', { name: /checkout/i })).toBeEnabled();
  },
};

export const EmptyOpen: Story = {
  args: {
    isOpen: true,
    cartItems: [],
    totalPrice: 0,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    cartItems,
    totalPrice: 19,
  },
};
