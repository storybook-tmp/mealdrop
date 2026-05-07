import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import restaurantsImage from '../../assets/images/restaurants.png';

import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {
  args: {
    title: 'Sushi',
    photoUrl: restaurantsImage,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Sushi')).toBeVisible();
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible();
  },
};

export const Rounded: Story = {
  args: {
    title: 'Pizza',
    photoUrl: restaurantsImage,
    round: true,
  },
};

export const Brunch: Story = {
  args: {
    title: 'Brunch',
    photoUrl: restaurantsImage,
  },
};
