import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Order food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order food/i })).toBeVisible();
  },
};

export const Clear: Story = {
  args: {
    children: 'Home',
    clear: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /home/i });
    await expect(button).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /cart/i })).toBeVisible();
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'cart',
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeVisible();
  },
};

export const Large: Story = {
  args: {
    children: 'Place order',
    large: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /place order/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button')).toBeDisabled();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // Button uses font-family: 'Hind' — fails if global CSS did not load
    await expect(getComputedStyle(button).fontFamily).toContain('Hind');
  },
};
