import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click me',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    clear: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Add to Cart',
    icon: 'cart',
    iconSize: 20,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    large: true,
  },
};
