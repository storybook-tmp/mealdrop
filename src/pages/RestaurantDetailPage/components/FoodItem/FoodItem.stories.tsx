import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { FoodItem } from './FoodItem';

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
  args: {
    name: 'Classic Burger',
    description: 'Beef patty with lettuce and tomato',
    price: 9.99,
    onClick: () => {},
  },
} satisfies Meta<typeof FoodItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Classic Burger')).toBeVisible();
    await expect(canvas.getByText(/9\.99/)).toBeVisible();
  },
};

export const WithQuantity: Story = {
  args: { quantity: 3 },
};
