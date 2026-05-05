import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible();
    await expect(canvas.getByAltText('restaurant category')).toBeVisible();
  },
};

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Sushi')).toBeVisible();
  },
};

export const Burgers: Story = {
  args: {
    title: 'Burgers',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Burgers')).toBeVisible();
  },
};
