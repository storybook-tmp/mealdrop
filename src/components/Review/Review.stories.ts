import type { Meta, StoryObj } from '@storybook/react';
import { Review } from './Review';

const meta = {
  title: 'AI Generated/Complex/Review',
  component: Review,
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoReviews: Story = {
  args: {
    rating: undefined,
  },
};

export const VeryPoor: Story = {
  args: {
    rating: 1.5,
  },
};

export const Adequate: Story = {
  args: {
    rating: 3.0,
  },
};

export const VeryGood: Story = {
  args: {
    rating: 4.2,
  },
};

export const Excellent: Story = {
  args: {
    rating: 5.0,
  },
};
