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
    title: 'Burger Palace',
    photoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
  },
};

export const NoTitle: Story = {
  args: {
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
  },
  play: async ({ canvas }) => {
    // No heading should be rendered when no title is provided
    const headings = canvas.queryAllByRole('heading');
    await expect(headings.length).toBe(0);
  },
};
