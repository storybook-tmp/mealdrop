import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Review } from './Review';

const meta = {
  component: Review,
} satisfies Meta<typeof Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoRating: Story = {
  render: () => <Review />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no reviews yet/i)).toBeVisible();
  },
};

export const Adequate: Story = {
  render: () => <Review rating={3} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/adequate/i)).toBeVisible();
  },
};

export const VeryGood: Story = {
  render: () => <Review rating={4.2} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/very good/i)).toBeVisible();
    await expect(canvas.getByText(/4\.2/)).toBeVisible();
  },
};

export const Excellent: Story = {
  render: () => <Review rating={5} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/excellent/i)).toBeVisible();
    await expect(canvas.getByText(/5\.0/)).toBeVisible();
  },
};
