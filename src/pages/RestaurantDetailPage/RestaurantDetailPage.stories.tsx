import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    skipRouter: true,
  },
  decorators: [
    () => (
      <MemoryRouter initialEntries={['/restaurants/1']}>
        <Routes>
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    });
    await expect(canvas.getByText('Cheeseburger')).toBeVisible();
  },
};
