import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CheckoutPage } from './CheckoutPage';

const meta = {
  component: CheckoutPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible();
  },
};
