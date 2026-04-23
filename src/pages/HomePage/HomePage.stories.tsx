import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';

import { HomePage } from './HomePage';

const meta = {
  component: HomePage,
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HomePage />,
  play: async ({ canvas }) => {
    await waitFor(
      () => {
        const banner = canvas.getByText(/our favorite picks/i);
        expect(banner).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
};
