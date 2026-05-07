import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { FoodItem } from './FoodItem';

const meta = {
  component: FoodItem,
  tags: ['ai-generated'],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof FoodItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Cheeseburger',
    description: 'Nice grilled burger with cheese',
    price: 8.5,
  },
};

export const WithQuantity: Story = {
  args: {
    name: 'Fries',
    description: 'Fried french fries',
    price: 2.5,
    quantity: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('food quantity')).toHaveTextContent('2');
  },
};

export const WithoutDescription: Story = {
  args: {
    name: 'Sprite',
    price: 1.5,
  },
};
