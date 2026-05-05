import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    reactRouter: {
      route: { path: '/restaurants/:id' },
      location: { pathname: '/restaurants/1' },
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('heading', { name: /burger kingdom/i })
    ).toBeVisible();
  },
};
