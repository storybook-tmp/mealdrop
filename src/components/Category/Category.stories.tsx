import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { categories } from '../../stub/categories';
import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

const sushi = categories.find((category) => category.id === 'sushi') ?? categories[0];
const pizza = categories.find((category) => category.id === 'pizza') ?? categories[1];

export const Square: Story = {
  args: {
    title: sushi.title,
    photoUrl: sushi.photoUrl,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(sushi.title)).toBeVisible();
    await expect(canvas.getByAltText('restaurant category')).toHaveAttribute('src', sushi.photoUrl);
  },
};

export const Round: Story = {
  args: {
    title: pizza.title,
    photoUrl: pizza.photoUrl,
    round: true,
  },
};
