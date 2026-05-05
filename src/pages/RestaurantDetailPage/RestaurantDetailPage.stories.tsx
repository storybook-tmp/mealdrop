import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    router: {
      routePath: '/restaurants/:id',
      routeEntry: '/restaurants/1',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Burger Kingdom')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await expect(canvas.getByText(/Specialties:/)).toBeVisible();
  },
};
