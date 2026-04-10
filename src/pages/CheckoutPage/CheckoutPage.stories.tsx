import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    const heading = canvas.getByText(/checkout/i);
    await expect(heading).toBeVisible();
  },
};
