import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitle: Story = {
  args: {
    title: 'Categories',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Categories')).toBeVisible();
  },
};

export const WithPhoto: Story = {
  args: {
    title: 'Burger Kingdom',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Order confirmed!',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible();
  },
};
