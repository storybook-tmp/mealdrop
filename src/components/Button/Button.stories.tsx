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
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  },
};

export const Large: Story = {
  args: {
    children: 'Get started',
    large: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /get started/i });
    await expect(button).toBeVisible();
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
    children: 'Add to cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /add to cart/i });
    await expect(button).toBeVisible();
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'cart',
    round: true,
    'aria-label': 'food cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /food cart/i });
    await expect(button).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /disabled/i });
    await expect(button).toBeDisabled();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // Button uses font-family: 'Hind' from styled-components - proves CSS loaded
    await expect(getComputedStyle(button).fontFamily).toBe('Hind');
  },
};
