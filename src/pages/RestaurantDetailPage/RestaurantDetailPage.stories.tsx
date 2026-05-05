import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Route, Routes } from 'react-router-dom';
import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  tags: ['ai-generated'],
  parameters: {
    memoryRouter: { initialEntries: ['/restaurants/1'] },
  },
  decorators: [
    (Story) => (
      <Routes>
        <Route path="/restaurants/:id" element={<Story />} />
      </Routes>
    ),
  ],
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Burger Palace')).toBeVisible();
    await expect(await canvas.findByText(/★ 4.5 Very good/)).toBeVisible();
  },
};
