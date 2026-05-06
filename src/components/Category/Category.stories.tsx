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
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible();
    await expect(canvas.getByAltText('restaurant category')).toBeVisible();
  },
};

export const Rounded: Story = {
  args: {
    title: 'Burgers',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    round: true,
  },
};
