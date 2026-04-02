import type { Meta, StoryObj } from '@storybook/react-vite';

import { Review } from './Review';

const meta = {
  title: 'AI Generated/Simple/Review',
  component: Review,
  args: {
    rating: 4.8,
  },
} satisfies Meta<typeof Review>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HighlyRated: Story = {};

export const NoReviewsYet: Story = {
  args: {
    rating: undefined,
  },
};
