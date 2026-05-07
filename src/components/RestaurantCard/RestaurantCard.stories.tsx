import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { restaurantsCompleteData } from '../../stub/restaurants';

import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: restaurantsCompleteData[0],
  play: async ({ canvas }) => {
    await expect(canvas.getByText('burgers')).toBeVisible();
    await expect(canvas.getByText('comfort food')).toBeVisible();
  },
};

export const New: Story = {
  args: restaurantsCompleteData[3],
};

export const Closed: Story = {
  args: restaurantsCompleteData[2],
};

export const Loading: Story = {
  args: { ...restaurantsCompleteData[0], isLoading: true },
};
