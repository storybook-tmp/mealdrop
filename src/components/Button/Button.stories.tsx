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
    children: 'Order now',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /order now/i })).toBeVisible();
  },
};

export const Clear: Story = {
  args: {
    clear: true,
    children: 'Home',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /home/i })).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /add to cart/i })).toBeVisible();
  },
};

export const Large: Story = {
  args: {
    large: true,
    children: 'Continue',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /continue/i })).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeDisabled();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    await expect(getComputedStyle(button).fontFamily).toContain('Hind');
  },
};
