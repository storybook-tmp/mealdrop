import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

const meta = {
  component: HomePage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(() =>
      expect(canvas.getByRole('heading', { name: /our favorite picks/i })).toBeVisible()
    );
    await expect(canvas.getByRole('link', { name: /go to home page/i })).toBeVisible();
  },
};

export const WithRestaurantsLoaded: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(
      () => expect(canvas.getByText('Burger Kingdom')).toBeVisible(),
      { timeout: 5000 }
    );
    await expect(canvas.getAllByTestId('restaurant-card').length).toBeGreaterThan(0);
  },
};
