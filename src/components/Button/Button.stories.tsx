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
    children: 'Order now',
  },
};

export const Clear: Story = {
  args: {
    children: 'Cancel',
    clear: true,
  },
};

export const LargeWithIcon: Story = {
  args: {
    children: 'View cart',
    icon: 'cart',
    large: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
  },
};

export const CssCheck: Story = {
  args: {
    children: 'Submit',
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: /submit/i });

    await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32, 32, 32)');
  },
};
