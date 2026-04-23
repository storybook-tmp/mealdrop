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
    // Wait for the page to render (check for PageTemplate elements)
    await waitFor(
      async () => {
        // Check for any heading that indicates the page loaded
        const heading = canvas.getByText(/Our favorite picks/i);
        await expect(heading).toBeVisible();
      },
      { timeout: 5000 }
    );
  },
};
