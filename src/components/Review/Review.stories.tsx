import type { Meta, StoryObj } from '@storybook/react-vite';
import { Review } from './Review';

const meta = {
  title: 'AI Generated/Simple/Review',
  component: Review,
  tags: ['ai-generated'],
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoRating: Story = {
  args: {},
};

export const LowRating: Story = {
  args: {
    rating: 1.5,
  },
};

export const GoodRating: Story = {
  args: {
    rating: 4.2,
  },
};

export const ExcellentRating: Story = {
  args: {
    rating: 5.0,
  },
};
