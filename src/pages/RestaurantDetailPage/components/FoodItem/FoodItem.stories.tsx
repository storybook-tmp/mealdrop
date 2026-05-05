import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FoodItem } from './FoodItem';

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
} satisfies Meta<typeof FoodItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Classic Burger',
    price: 9.99,
    description: 'Beef patty with lettuce, tomato, and special sauce',
    onClick: () => {},
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /classic burger/i })).toBeVisible();
    await expect(canvas.getByText('€9.99')).toBeVisible();
  },
};

export const WithQuantity: Story = {
  args: {
    name: 'Cheese Burger',
    price: 11.99,
    description: 'With cheddar cheese',
    quantity: 2,
    onClick: () => {},
  },
};

export const NoDescription: Story = {
  args: {
    name: 'Side Salad',
    price: 4.99,
    onClick: () => {},
  },
};
