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
    const button = canvas.getByRole('button', { name: /order now/i });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
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
    await expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  },
};

export const Large: Story = {
  args: {
    children: 'Try again',
    large: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /try again/i });
    await expect(button).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'cart',
    children: 'Cart',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /cart/i });
    await expect(button).toBeVisible();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    await expect(button).toBeDisabled();
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // Button uses color.buttonPrimary which is baseColors.grey.dark6 = #202020
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)');
  },
};
