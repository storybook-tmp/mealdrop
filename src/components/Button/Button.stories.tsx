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
    const button = canvas.getByRole('button', { name: /order now/i });
    await expect(button).toBeVisible();
    await expect(getComputedStyle(button).borderRadius).toBe('4px');
  },
};

export const Clear: Story = { args: { children: 'Cancel', clear: true } };
export const Large: Story = { args: { children: 'Checkout', large: true } };
export const WithIcon: Story = { args: { icon: 'cart', 'aria-label': 'food cart' } };
export const Round: Story = { args: { icon: 'cross', round: true, clear: true, 'aria-label': 'close' } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // Button uses color.buttonPrimary which is baseColors.grey.dark6 = '#202020' in light theme
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)');
  },
};
