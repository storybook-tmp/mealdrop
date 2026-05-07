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
  args: { children: 'Add to order' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to order/i })).toHaveAttribute(
      'type',
      'button'
    );
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
  args: { children: 'Unavailable', disabled: true },
};
