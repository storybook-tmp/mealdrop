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
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    title: 'Pizza Place',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza Place')).toBeVisible();
  },
};
