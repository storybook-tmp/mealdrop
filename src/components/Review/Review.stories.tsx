import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Review } from './Review';

const meta = {
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRating: Story = {
  args: { rating: 4.2 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/4\.2/)).toBeVisible();
  },
};

export const NoRating: Story = {
  args: { rating: undefined },
};

export const PerfectScore: Story = {
  args: { rating: 5 },
};
