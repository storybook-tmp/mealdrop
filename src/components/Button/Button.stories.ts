import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'AI Generated/Simple/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    large: true,
  },
};

export const Clear: Story = {
  args: {
    children: 'Clear Button',
    clear: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Add to cart',
    icon: 'cart',
    iconSize: 16,
  },
};
