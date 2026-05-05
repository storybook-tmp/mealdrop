import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CategoryDetailPage } from './CategoryDetailPage';

const meta = {
  component: CategoryDetailPage,
  tags: ['ai-generated'],
  parameters: {
    skipRouter: true,
  },
  decorators: [
    () => (
      <MemoryRouter initialEntries={['/categories/burgers']}>
        <Routes>
          <Route path="/categories/:id" element={<CategoryDetailPage />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    });
  },
};
