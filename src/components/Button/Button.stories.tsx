import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Order now' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible();
  },
};

export const Clear: Story = {
  args: { children: 'Cancel', clear: true },
};

export const Large: Story = {
  args: { children: 'Checkout', large: true },
};

export const WithIcon: Story = {
  args: { icon: 'cart', 'aria-label': 'food cart' },
};

export const Disabled: Story = {
  args: { children: 'Submit', disabled: true },
};

export const Round: Story = {
  args: { icon: 'cross', round: true, 'aria-label': 'close' },
};
