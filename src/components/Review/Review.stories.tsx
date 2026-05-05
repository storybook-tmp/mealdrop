import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Review } from './Review';

const meta = {
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Excellent: Story = {
  args: { rating: 5.0 },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/★ 5.0 Excellent/)).toBeVisible();
  },
};

export const VeryGood: Story = {
  args: { rating: 4.2 },
};

export const Adequate: Story = {
  args: { rating: 2.5 },
};

export const NoReviews: Story = {
  args: {},
};
