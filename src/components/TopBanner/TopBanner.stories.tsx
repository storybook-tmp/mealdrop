import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { TopBanner } from './TopBanner';

const meta = {
  component: TopBanner,
  tags: ['ai-generated'],
} satisfies Meta<typeof TopBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTitleAndPhoto: Story = {
  args: {
    title: 'Italian Restaurants',
    photoUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Italian Restaurants')).toBeVisible();
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'All Restaurants',
  },
};

export const NoContent: Story = {
  args: {},
};
