import type { Meta, StoryObj } from '@storybook/react-vite';
import { Review } from './Review';

const meta = {
  component: Review,
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VeryGood: Story = {
  render: () => <Review rating={4.2} />,
};

export const Excellent: Story = {
  render: () => <Review rating={5.0} />,
};

export const NoReviews: Story = {
  render: () => <Review />,
};
