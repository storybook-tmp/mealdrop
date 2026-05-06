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
    // Button uses theme.color.buttonPrimary (#202020) — fails if ThemeProvider/GlobalStyle not loaded
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)');
  },
};

export const CssCheck: Story = {
  args: { children: 'Submit' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });
    // StyledButton uses theme.color.buttonPrimary = #202020 (light theme)
    // This fails if the ThemeProvider or GlobalStyle did not load.
    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)');
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
