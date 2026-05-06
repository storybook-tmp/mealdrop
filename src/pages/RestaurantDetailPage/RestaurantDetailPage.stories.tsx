import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { Route, Routes } from 'react-router-dom';
import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    routerInitialEntries: ['/restaurants/1'],
  },
  render: () => (
    <Routes>
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
    </Routes>
  ),
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
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible();
    await expect(canvas.getByText('To eat')).toBeVisible();
  },
};

export const MenuItems: Story = {
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        expect(canvas.getByText('Cheeseburger')).toBeVisible();
      },
      { timeout: 5000 },
    );
    await expect(canvas.getByText('Fries')).toBeVisible();
    await expect(canvas.getByText('Vanilla ice cream')).toBeVisible();
  },
};
